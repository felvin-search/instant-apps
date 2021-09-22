import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { HomePage } from "../client/App";
import instantApps from "./apps";
console.log(instantApps);

const PORT = process.env.PORT || 3000;
const app = express();
// relative to the sandbox package root
const indexFile = path.resolve("./src/client/index.html");

app.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(<HomePage />);
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.get("/search", (req, res) => {
  const q = req.query.q;
  console.log(instantApps);

  // Call every queryToData of all apps one by one, and if any app returns a data, then basically respond.

  // const app = ReactDOMServer.renderToString(<SearchPage />);

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static("."));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
