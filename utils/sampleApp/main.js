const SampleApp = {
  name: "Sample App",
  description: "I am a sample app",
  logo: "",
  // Description
  dataFetcher: () => {
    return "Hello world";
  },
  // This will be rendered if queryToData returns some data.
  renderer: ({ data }) => {
    return <div>{data}</div>;
  },
};

export default SampleApp;
