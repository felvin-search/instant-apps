const MyAppComponent = (props) => {
    return <div>Tic Tac Toe</div>
}

const shouldRunMyApp = async ({query}) => {
    const triggerQueries = ["my app", "tic tac toe"];
    for (const triggerQuery of triggerQueries) {
      if (query.toLowerCase() === triggerQuery) {
        return {query};
      }
    }
    return;
}

const MyApp = {
  name: "MyApp",
  description: "I am a template app, please change this description",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: shouldRunMyApp,
  Component: MyAppComponent,
};

export default MyApp;
