import express from "express";
import fs from "fs";
import path from "path";
// import { HomePage } from "../client/App";
import instantApps from "./apps";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
// console.log(instantApps);

const PORT = process.env.PORT || 3000;
const expressApp = express();
// relative to the sandbox package root
const indexFile = path.resolve("./src/client/index.html");

// Used to serve static bundle
expressApp.use("/", express.static(path.resolve(__dirname, "public")));
expressApp.use("/search", express.static(path.resolve(__dirname, "public")));

// expressApp.get("/", (req, res) => {
//   // const home = ReactDOMServer.renderToString(<HomePage />);
//   fs.readFile(indexFile, "utf8", (err, data) => {
//     if (err) {
//       console.error("Something went wrong:", err);
//       return res.status(500).send("Oops, better luck next time!");
//     }

//     return res.send(
//       data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
//     );
//   });
// });

expressApp.get("/instant-apps", async (req, res) => {
  const q = req.query.q;
  console.log("received query in sandbox");
  console.log(q);

  for (const app of instantApps) {
    // console.log("trying app", app);
    try {
      const data = await app.queryToData({ query: q });
      if (!!data) {
        console.log(data);
        const sheet = new ServerStyleSheet();
        try {
          const _html = ReactDOMServer.renderToString(
            sheet.collectStyles(<app.Component data={data} />)
          );
          const css = sheet.getStyleTags();
          const html = `${css}${_html}`;
          console.log("Sending html with stylesheet");
          console.log(html);
          res.status(200).json({ html });
        } catch (err) {
          console.log("Error in rendering app");
          console.log(err);
          console.log("trying without stylesheet");
          try {
            const html = ReactDOMServer.renderToString(
              <app.Component data={data} />
            );
            res.status(200).json({ html });
          } catch (err) {
            console.log("Without styled components failed as well");
            console.log(err);
            console.log("Giving up");
            // TODO show better logs.
            res.status(500).json({
              message: "Found app, but server was unable to render it.",
            });
          }
        } finally {
          sheet.seal();
          return;
        }
      }
    } catch (error) {
      // Doesn't have to be an actual error, just some app throwing error for the falsy queryToData case.
      console.log(error);
      res.status(200).json({ message: "no apps found" });
      return;
      // continue
    }
  }

  res.status(200).json({ message: "no apps found" });

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

expressApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
