const fs = require("node:fs/promises");
const path = require("node:path");
const data = require("../data.js");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
const client = path.join(output, "client");
const pagesOutput = path.join(root, "docs");

async function copy(source, destination) {
  await fs.cp(path.join(root, source), path.join(client, destination), { recursive: true, force: true });
}

async function build() {
  require("./sync-data-summary.js")();
  await fs.mkdir(path.join(output, "server"), { recursive: true });
  await fs.mkdir(client, { recursive: true });
  await Promise.all([
    copy("index.html", "index.html"),
    copy("app.js", "app.js"),
    copy("locale.js", "locale.js"),
    copy("library-view.js", "library-view.js"),
    copy("deadline-data.js", "deadline-data.js"),
    copy("data.js", "data.js"),
    copy("styles.css", "styles.css"),
    copy("record-guide.js", "record-guide.js"),
    copy("classification-reviews.js", "classification-reviews.js"),
    copy("library-tools.js", "library-tools.js"),
    copy("programme-data.js", "programme-data.js"),
    copy("page-insights.js", "page-insights.js"),
    copy("assets", "assets"),
    copy("data", "data")
  ]);
  await fs.copyFile(path.join(root, "worker", "site-worker.js"), path.join(output, "server", "index.js"));
  await fs.writeFile(path.join(client, "data", "observatory-data.json"), `${JSON.stringify(data)}\n`, "utf8");
  await fs.cp(client, pagesOutput, { recursive: true, force: true });
  for (const directory of [client, pagesOutput]) {
    for (const retired of ["clarity.css", "observatory.css", "page-insights.css"]) {
      await fs.rm(path.join(directory, retired), {force:true});
    }
  }
  await fs.writeFile(path.join(pagesOutput, ".nojekyll"), "", "utf8");
  process.stdout.write("Prepared deployable site output.\n");
}

build().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
