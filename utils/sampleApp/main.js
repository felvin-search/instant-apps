console.log("Hello world")


const SampleApp = {
    name: "Sample App",
    description:
      "I am a sample app",
    logo:
      "",
    dataFetcher: () => {return "Hello world"},
    renderer: ({data}) => {return <div>{data}</div>},
  };
  
  export default SampleApp;