"""Carry small editorial changes across isolated review, validation and publish jobs."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess


EDITORIAL = {
    "data.js", "record-guide.js", "classification-reviews.js",
    "programme-data.js", "deadline-data.js", "locale.js",
}
PUBLISHABLE = EDITORIAL | {"index.html", "README.md"} | {
    f"{folder}/{name}"
    for folder in ("docs", "dist/client")
    for name in EDITORIAL | {"index.html", "data/observatory-data.json"}
}


def git(*args, input=None):
    return subprocess.run(
        ["git", *args], input=input, stdout=subprocess.PIPE,
        stderr=subprocess.PIPE, check=True,
    ).stdout


def digest(content):
    return hashlib.sha256(content).hexdigest()


def changed_files(allowed):
    entries = git("diff", "--name-status", "--no-renames", "-z", "HEAD").decode().split("\0")
    files = []
    for status, name in zip(entries[0:-1:2], entries[1:-1:2]):
        if status != "M" or name not in allowed:
            raise ValueError(f"Unexpected file change: {status} {name}")
        if Path(name).is_symlink() or not Path(name).is_file():
            raise ValueError(f"Expected regular file: {name}")
        files.append(name)
    if git("diff", "--summary", "HEAD").strip():
        raise ValueError("File creation, deletion, renaming and mode changes are forbidden")
    return files


def apply_review(result):
    status = result.get("status")
    patch = result.get("patch")
    if status not in {"updated", "no_change", "blocked"} or not isinstance(patch, str):
        raise ValueError("Missing or invalid review result")
    if status == "blocked":
        raise ValueError("Source review blocked: " + str(result.get("summary", "")))
    if status == "no_change":
        if patch:
            raise ValueError("No-change review must have an empty patch")
        return False
    if not patch or len(patch) > 24000 or not result.get("sources"):
        raise ValueError("Updates require source evidence and a patch under 24,000 characters")
    for source in result["sources"]:
        if not source.get("url", "").startswith("https://") or not all(
            source.get(key) for key in ("publication_date", "locator", "finding")
        ):
            raise ValueError("Incomplete primary-source evidence")
    encoded = patch.encode("utf-8")
    # --numstat parses Git's path quoting; exact matches exclude traversal and CI edits.
    stats = git("apply", "--numstat", "-z", input=encoded).decode().split("\0")
    names = []
    for line in filter(None, stats):
        added, deleted, name = line.split("\t", 2)
        if not added.isdigit() or not deleted.isdigit() or name not in EDITORIAL:
            raise ValueError("Patch contains a non-editorial or binary change")
        names.append(name)
    if not names or git("apply", "--summary", input=encoded).strip():
        raise ValueError("Only modifications to existing editorial files are allowed")
    git("apply", "--check", input=encoded)
    git("apply", input=encoded)
    changed = changed_files(EDITORIAL)
    if not changed:
        raise ValueError("Updated review did not change editorial content")
    # Version only changed assets, deterministically; no timestamp-only commits.
    html = Path("index.html").read_text(encoding="utf-8")
    for name in changed:
        version = digest(Path(name).read_bytes())[:12]
        html = re.sub(
            rf'({re.escape(name)}\?v=)[^"\s]+',
            lambda match: match[1] + version, html,
        )
    Path("index.html").write_text(html, encoding="utf-8", newline="\n")
    return True


def pack(path):
    files = changed_files(PUBLISHABLE)
    if not EDITORIAL.intersection(files):
        raise ValueError("No material editorial changes to package")
    bundle = {"base": git("rev-parse", "HEAD").decode().strip(), "files": []}
    for name in files:
        before = git("show", f"HEAD:{name}")
        bundle["files"].append({
            "path": name, "before": digest(before),
            "content": Path(name).read_text(encoding="utf-8"),
        })
    Path(path).write_text(json.dumps(bundle, ensure_ascii=False), encoding="utf-8")


def publish(bundle):
    if not re.fullmatch(r"[0-9a-f]{40}", bundle.get("base", "")):
        raise ValueError("Invalid base commit")
    git("merge-base", "--is-ancestor", bundle["base"], "HEAD")
    entries = bundle.get("files", [])
    names = [entry["path"] for entry in entries]
    if len(names) != len(set(names)) or not EDITORIAL.intersection(names):
        raise ValueError("Invalid publication file list")
    # Validate everything BEFORE writing; a concurrent edit fails without partial changes.
    for entry in entries:
        name = entry["path"]
        if name not in PUBLISHABLE or Path(name).is_symlink() or not Path(name).is_file():
            raise ValueError(f"Unexpected publication path: {name}")
        original = git("show", f"{bundle['base']}:{name}")
        if digest(original) != entry["before"]:
            raise ValueError(f"Invalid original content hash: {name}")
        current = Path(name).read_bytes()
        if current != original and current != entry["content"].encode("utf-8"):
            raise ValueError(f"Newer changes conflict with the reviewed update: {name}")
    for entry in entries:
        Path(entry["path"]).write_text(entry["content"], encoding="utf-8", newline="\n")
    git("add", "--", *names)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("operation", choices=("review", "pack", "publish"))
    parser.add_argument("file", nargs="?")
    args = parser.parse_args()
    if args.operation == "review":
        result = json.loads(os.environ["REVIEW_JSON"])
        changed = apply_review(result)
        with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as output:
            output.write(f"changed={str(changed).lower()}\n")
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as summary:
            summary.write(str(result.get("summary", "")) + "\n")
            for source in result.get("sources", []):
                summary.write(f"\n- {source['url']} — {source['publication_date']} — {source['locator']}\n")
    elif args.operation == "pack":
        pack(args.file)
    else:
        publish(json.loads(Path(args.file).read_text(encoding="utf-8")))


if __name__ == "__main__":
    main()
