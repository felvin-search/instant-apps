import express from "express";
import fs from "fs";
import path from "path";
// import { HomePage } from "../client/App";
import instantApps from "./apps";
console.log(instantApps);

const PORT = process.env.PORT || 3000;
const expressApp = express();
// relative to the sandbox package root
const indexFile = path.resolve("./src/client/index.html");

expressApp.get("/", (req, res) => {
  // const home = ReactDOMServer.renderToString(<HomePage />);
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

expressApp.get("/search", async (req, res) => {
  const q = req.query.q;
  console.log(q);

  for (const app of instantApps) {
    console.log("trying app", app);
    try {
      const data = await app({ query: q });
      if (!!data) {
        console.log(data);
        res.status(200).json({ data });
      }
    } catch (error) {
      console.error(error);
      res.status(200).json({ message: "no apps found" });
      // continue
    }
  }

  // Call every queryToData of all apps one by one, and if any app returns a data, then basically respond.

  // const searchApp = ReactDOMServer.renderToString(<SearchPage />);

  // fs.readFile(indexFile, "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Something went wrong:", err);
  //     return res.status(500).send("Oops, better luck next time!");
  //   }

  //   return res.send(
  //     data.replace('<div id="root"></div>', `<div id="root">${searchApp}</div>`)
  //   );
  // });
});

expressApp.use(express.static("."));

expressApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
