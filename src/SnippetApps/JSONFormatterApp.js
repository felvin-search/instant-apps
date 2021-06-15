import React, { useState } from 'react'
import JSONPretty from 'react-json-pretty';


export default function PrettifyJSON() {
    const [jsonData, setJsonData] = useState({})

    return(
        <React.Fragment>
            <textarea rows="10" cols="100" onChange={e => setJsonData(e.target.value)} />
            <JSONPretty id="json-pretty" data={jsonData}></JSONPretty>
        </React.Fragment>
    )
}


// const PrettifyJSONApp = {
//     name: "PrettifyJSON",
//     id: "prettify_json",
//     description: "Prettify JSON",
//     logo: "",
//     dataFetcher: null,
//     renderer: CurrenyConvertor,
// };
  
// export default PrettifyJSONApp;
  