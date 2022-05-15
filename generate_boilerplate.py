import glob
import os
import json

INDEX_BOILERPLATE = """
export default allApps;

export const appDetails = allApps.map(
  ({ id, name, description, screenshotPath, exampleSearchQueries }) => {
    const details = {
      id,
      name,
      description,
      screenshotPath,
      exampleSearchQueries,
    };
    details.screenshotPath =
      "https://raw.githubusercontent.com/felvin-search/instant-apps/master/apps/" +
      id.split("/")[1] +
      "/src" +
      screenshotPath?.substring(1);
    return details;
  }
);"""

PACKAGE_JSON = {
    "name": "@felvin-search/apps",
    "description": "Wrapper package which re-exports all available Instant Apps",
    "version": "1.86.0",
    "license": "MIT",
    "main": "./src/index.ts",
    "publishConfig": {"access": "public", "main": "./dist/index.cjs.js"},
    "scripts": {"build": "felvin-cli build:app"},
    "devDependencies": {
        "@felvin-search/cli": "^1.59.0",
        "@types/react": "^17.0.0",
        "@types/styled-components": "^5.1.11",
        "styled-components": "^5.3.0",
    },
    "peerDependencies": {"styled-components": ">= 5"},
    "dependencies": {
        "@felvin-search/core": "^1.56.0",
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
    },
}


class GenerateApps:
    def __init__(self):
        self.import_statements = []
        self.all_apps = []
        self.dependencies = PACKAGE_JSON["dependencies"]
        self.apps = glob.glob(os.path.join(".", "apps", "**", "*.json"))
        self.index_path = os.path.join("packages", "apps", "src", "index.ts")
        self.package_path = os.path.join("packages", "apps", "package.json")

    def iterate_apps(self):
        for app in self.apps:
            with open(app) as f:
                package_json = json.load(f)
                version = package_json["version"]
                import_path = package_json["name"]
                app_name_split = import_path.split("/")[1].split("-")
                app_name = "".join(list(map(lambda x: x.capitalize(), app_name_split)))
                self.import_statements.append(
                    f'import {app_name} from "{import_path}";'
                )
                self.all_apps.append(app_name)
                self.dependencies[import_path] = f"^{version}"

    def generate_index_file(self):
        imports = "\n".join(self.import_statements)
        all_apps_list = ",\n  ".join(self.all_apps)

        ts_file = f"""{imports}
        \nconst allApps = [\n  {all_apps_list},\n];
        {INDEX_BOILERPLATE}\n
        """.strip()

        with open(self.index_path, "w") as f:
            f.write(ts_file)

    def generate_package_file(self):
        PACKAGE_JSON["dependencies"] = json.loads(
            json.dumps(self.dependencies, sort_keys=True)
        )
        with open(self.package_path, "w") as f:
            json.dump(PACKAGE_JSON, f, indent=2)

    def main(self):
        self.iterate_apps()
        self.generate_index_file()
        self.generate_package_file()


if __name__ == "__main__":
    generate_obj = GenerateApps()
    generate_obj.main()
