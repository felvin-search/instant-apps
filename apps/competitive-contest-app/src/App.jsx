import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as Icon from "react-feather";
//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  width: clamp(300px, 60vw, 700px);
  min-height: 10rem;
  align-items: center;
  padding: 1rem;
`;
const Navbar = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const NavbarItem = styled.span`
  text-decoration: ${(props) => (props.check ? "underline" : "none")};
  cursor: pointer;
`;
const Card = styled.div`
  background-color: #fafafa;
  margin-right: 3rem;
  width: 350px;
  padding: 2rem;
`;
const Title = styled.div`
  font-weight: 700;
  color: red;
`;
const BodyText = styled.div`
  font-weight: 200;
  color: #343434;
`;
const Link = styled.a`
  text-decoration: none;
  padding: 2px;
  background: black;
  color: white;
  cursor: pointer;
  text-align: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [contest, setContest] = useState(null);
  const [codeChef, setCodeChef] = useState([]);
  const [codeforeces, setCodeforeces] = useState([]);
  const [leetCode, setLeetCode] = useState([]);
  const [stage, setStage] = useState("codechef");
  const fetchdata = async () => {
    try {
      const res = await axios.get(`https://kontests.net/api/v1/code_chef`);
      const res1 = await axios.get(`https://kontests.net/api/v1/codeforces`);
      const res2 = await axios.get(`https://kontests.net/api/v1/leet_code`);
      setContest(res.data);
      setCodeChef(res.data);
      setCodeforeces(res1.data);
      setLeetCode(res2.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    if (contest) {
      console.log(contest);
      if (stage === "codechef") {
        setContest(codeChef);
      } else if (stage === "codeforces") {
        setContest(codeforeces);
      } else {
        setContest(leetCode);
      }
    }
  }, [stage]);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Icon.ArrowRightCircle color="black" />,
    prevArrow: <Icon.ArrowLeftCircle color="black" />,
  };

  return (
    <Container>
      <Navbar>
        <NavbarItem
          check={stage === "codechef"}
          onClick={() => setStage("codechef")}
        >
          CodeChef
        </NavbarItem>
        <NavbarItem
          check={stage === "codeforces"}
          onClick={() => setStage("codeforces")}
        >
          CodeForces
        </NavbarItem>
        <NavbarItem
          check={stage === "leetcode"}
          onClick={() => setStage("leetcode")}
        >
          Leet Code
        </NavbarItem>
      </Navbar>
      <Slider {...settings}>
        {contest &&
          contest.length != 0 &&
          contest.map((item, index) => (
            <Card key={index}>
              <Title>{item.name}</Title>
              <BodyText>Start Date: {item.start_time}</BodyText>
              <BodyText>End Date : {item.end_time}</BodyText>
              <BodyText>Duration :{item.duration / 3600}Hr</BodyText>
              <Link href={item.url}>Participate</Link>
            </Card>
          ))}
      </Slider>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["cp contest", "coding practice", "coding"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
