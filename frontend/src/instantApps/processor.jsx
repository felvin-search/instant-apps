// TODO: Hardcoded for now. Import from /apps/apps.json

const apps = ["dictionary", "timer"];

// const apps = {
//   dictionary: {
//     module: <>
//     queryToData: () => {},
//     Component: () => <div>Dictionary app</div>,
//   },
//   timer: {
//     queryToData: () => {},
//     Component: () => <div>Timer app</div>,
//   },
// };

const appsJson = {};

async function loadApps() {
  console.log("loading stuff");
  console.log(appsJson);
  for (const app of apps) {
    appsJson[app] = await import(`../apps/${app}`);
  }

  // appsJson.dictionary.module = await import("../apps/dictionary");
  console.log("imported");
  console.log(appsJson);
}

// apps.dictionary.queryToData = await import()
// All the imports
export default loadApps;
