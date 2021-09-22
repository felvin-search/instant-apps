import cors from "cors";
import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import apps from "./apps";

const port = process.env.PORT || 3000;

async function renderApps(query) {
  if (!query) {
    return "please specify a query";
  }
  for (const app of apps) {
    const data = await app.queryToData({ query });
    // TODO: This will always render the first app
    // @TODO: Make styled components
    if (!!data) {
      console.log(`Got data for ${app.id}`);
      console.log(data);
      const sheet = new ServerStyleSheet();
      try {
        // @ts-ignore
        const html = renderToString(
          sheet.collectStyles(<app.Component data={data} />)
        );
        console.log("Successfuly got html");
        const styleTag = sheet.getStyleTags();
        const responseDiv = `<div id="instant_apps_root">$${styleTag}${html}</div>`;
        return {
          html: responseDiv,
          scriptSrc: `http://localhost:${port}/${app.id}.js`,
        };
      } catch {
        console.log(`Error in app ${app.id}`);
        console.log("Trying without styledComponents");
        try {
          const html = renderToString(<app.Component data={data} />);
          const responseDiv = `<div id="instant_apps_root">${html}</div>`;
          return {
            html: responseDiv,
            scriptSrc: `http://localhost:${port}/${app.id}.js`,
          };
        } catch {
          console.log("Without styled components failed as well");
          console.log("Giving up");
        }
        console.error(Error);
      } finally {
        sheet.seal();
      }
    }
  }
  return "no app qualified";
}

const server = express();
server.use(express.json());
server.use(cors());
server.options("*", cors());
server.use("/", express.static(path.join(__dirname, "..", "apps_bundled")));

server.get("/", async (req, res) => {
  const query = decodeURIComponent(req.query.q);

  try {
    const instantAppResponse = await renderApps(query);
    console.log(query);
    res.send(instantAppResponse);
  } catch {
    console.error(Error);
    res.send("Something went wrong");
  }
});

server.listen(port, () => {
  console.log(`Running app on PORT: ${port}`);
});
