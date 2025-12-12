#!/usr/bin/env node

import yargs from "yargs";
import serve, { type Options } from "./serve.js";

yargs(process.argv.slice(2))
  .strict(true)
  .scriptName("estatic")
  .usage("$0 [dir]")
  .alias("help", "h")
  .alias("version", "v")
  .locale("en")
  .wrap(null)
  .fail((msg, err, yargs) => {
    yargs.showHelp();

    console.log();
    if (err) {
      console.error(msg);
    }

    process.exit(1);
  })
  .command<Options>(
    "$0 [dir]",
    "Start a static server",

    (yargs) =>
      yargs
        .positional("dir", {
          type: "string",
          default: ".",
          describe: "Static folder directory",
        })
        .option("port", {
          alias: "p",
          type: "number",
          default: 8080,
          requiresArg: true,
          describe: "Server port number",
        })
        .option("base", {
          alias: "b",
          type: "string",
          default: "/",
          requiresArg: true,
          describe: "Basic routing address",
        })
        .option("open", {
          alias: "o",
          type: "boolean",
          default: false,
          describe: "Open browser automatically",
        })
        .option("silent", {
          alias: "s",
          type: "boolean",
          default: false,
          describe: "Suppress log messages from output",
        })
        .option("cors", {
          alias: "c",
          type: "string",
          requiresArg: true,
          describe: 'Enable CORS via the "Access-Control-Allow-Origin" header',
        })
        .option("username", {
          type: "string",
          requiresArg: true,
          describe: "Username for basic authentication",
          implies: ["password"],
        })
        .option("password", {
          type: "string",
          requiresArg: true,
          describe: "Password for basic authentication",
          implies: ["username"],
        }),
    (argv) => serve(argv),
  )
  .parse();
