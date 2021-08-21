// TODO: Hardcoded for now. Import from /apps/apps.json

import dictionary from "../apps/dictionary"
// import timer from "../apps/timer"

// TODO: In the create sample app script, we can add a line here manually
// OR: We can ask the user to add an import line here and update list

const apps = [dictionary];

// async function loadApps() {
//   console.log("loading stuff");
//   console.log(appsJson);
//   for (const app of apps) {
//     import(`../apps/${app}`).then(
//       ({default: x}) => {
//         appsJson[app] = x;
//       }
//     );
//   }

//   // appsJson.dictionary.module = await import("../apps/dictionary");
//   console.log("imported");
//   console.log(appsJson);
// }

// apps.dictionary.queryToData = await import()
// All the imports
export default apps;
