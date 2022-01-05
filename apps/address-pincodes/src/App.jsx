import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from "axios";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  padding: 25px 50px;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      {data.length!=0?<div>
        <p>Number of pincodes found: {data.length}</p>
        <ul>
          {data.map((zip)=>{
            return(
              <li><small>{zip.Name}, {zip.Pincode}</small></li>
            )
          })}
        </ul>
        </div>
        :
        <p>Number of pincodes found: 0</p>
    
        }
      
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  query=query.toLowerCase();
  let filteredQuery = query.split(' ');
  const found = filteredQuery.find(word => word ==="pincode");
  if(!found){
    return;
  }
  // if (!isTriggered(query, [ "Pincode of hauz khas delhi","Pincode of Ranchi" ])) {
  //   return;
  // }
  
 
  filteredQuery = filteredQuery.filter((word) => (word !== 'pincode' && word !== 'of'));
  filteredQuery = filteredQuery.join(' ');

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.
  let response = "";
  try {
    response = await axios.get(`https://api.postalpincode.in/postoffice/${filteredQuery}`);
    // console.log(response.data[0].PostOffice)
  }
  catch(err) {
    console.log(err);
    return;
  }
  if(response.data[0].PostOffice===null)return []
  return response.data[0].PostOffice;
}

export { queryToData, Component };
