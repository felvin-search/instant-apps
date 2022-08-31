import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./app.css";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const Batches = {
  W22: 402,
  S21: 390,
  W21: 331,
  W20: 222,
  S22: 218,
  S20: 205,
  W19: 197,
  S19: 173,
  W18: 148,
  S18: 131,
  S17: 125,
  W16: 122,
  W17: 116,
  W15: 112,
  S15: 106,
  S16: 104,
  S12: 83,
  S14: 79,
  IK12: 78,
  W14: 74,
  W12: 66,
  S11: 60,
  S13: 52,
  W13: 46,
  W11: 45,
  S10: 36,
  W10: 26,
  S09: 25,
  S08: 22,
  W08: 21,
  S07: 19,
  W09: 17,
  W07: 13,
  S06: 11,
  S05: 10,
  W06: 7,
  Unspecified: 2,
  W23: 1,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cards = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding: 1rem;
  margin: 0.2rem;
  width: 500px;
  display: flex;
  cursor: pointer;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
`;
const Title = styled.p`
  margin: 0;
  font-weight: 700;
`;
const Locations = styled.p`
  margin: 0;
  font-size: smaller;
  font-weight: 100;
  margin-left: 20px;
`;
const ShortDesc = styled.p`
  margin: 10px 0;
  font-size: smaller;
  font-weight: 200;
`;
const Tags = styled.span`
  margin: 5px 0;
  background-color: #e6e6dd;
  padding: 3px;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 12px;
  display: inline-flex;
  width: fit-content;
  align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Div = styled.div``;
const Span = styled.span`
  height: 10px;
  width: 10px;
  overflow: hidden;
`;
const Select = styled.select`
  width: 40%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 1px black solid;
  border-radius: 20px;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Link = styled.a`
  text-decoration: none;
  all: unset;
`;

const CompanyDetails = ({
  name,
  imgUrl,
  desc,
  locations,
  tags,
  batch,
  slug,
}) => {
  return (
    <Link
      href={`https://www.ycombinator.com/companies/${slug}`}
      target="_blank"
    >
      <Cards>
        <Div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            height: "75px",
            width: "75px",
          }}
        >
          <Img src={imgUrl} />
        </Div>
        <Div style={{ marginLeft: "20px" }}>
          <Div style={{ display: "flex" }}>
            <Title>{name}</Title>
            <Locations>{locations}</Locations>
          </Div>
          <ShortDesc>{desc}</ShortDesc>
          <TagContainer>
            <Tags>
              <img
                style={{ marginRight: "5px" }}
                height="15px"
                width="15px"
                src="https://www.ycombinator.com/packs/media/images/ycdc/ycombinator-logo-ee6c80faf1d1ce2491d80228063a9d88.png"
              />
              {batch}
            </Tags>
            {tags.map((tag) => {
              return <Tags key={tag}>{tag}</Tags>;
            })}
          </TagContainer>
        </Div>
      </Cards>
    </Link>
  );
};

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data: db }) {
  const [batch, setBatch] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(db.batch);
  const [selectedCategory, setSelectedCategory] = useState(db.category);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  const getData = async () => {
    let url;
    if (selectedBatch === "" && selectedCategory === "") {
      url = "https://yc-stats.fly.dev/api/v1/all";
    } else if (selectedBatch === "" && selectedCategory !== "") {
      url = `https://yc-stats.fly.dev/api/v1/apply/filters?tags=${selectedCategory}`;
    } else if (selectedBatch !== "" && selectedCategory === "") {
      url = `https://yc-stats.fly.dev/api/v1/apply/filters?batch=${selectedBatch}`;
    } else {
      url = `https://yc-stats.fly.dev/api/v1/apply/filters?tags=${selectedCategory}&batch=${selectedBatch}`;
    }
    const res = await axios.get(url);
    const data = res.data;

    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((company) => (
      <CompanyDetails
        key={company.id}
        name={company.name}
        imgUrl={company.small_logo_thumb_url}
        desc={company.one_liner}
        locations={company.all_locations}
        tags={company.tags}
        batch={company.batch}
        slug={company.slug}
      />
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };
  useEffect(() => {
    console.log(selectedBatch);
    getData(
      `https://yc-stats.fly.dev/api/v1/apply/filters?batch=${selectedBatch}`
    );
  }, [offset, selectedBatch, selectedCategory]);

  const fetchBatch = async () => {
    const res = await axios.get(
      "https://yc-stats.fly.dev/api/v1/filters?tags=batch"
    );
    let batch = res.data;
    for (const key in batch) {
      setBatch((prev) => [...prev, key]);
    }
  };

  const fetchCatgories = async () => {
    const res = await axios.get(
      "https://yc-stats.fly.dev/api/v1/filters?tags=tags"
    );
    let category = res.data;
    for (const key in category) {
      setCategory((prev) => [...prev, key]);
    }
  };

  useEffect(() => {
    fetchBatch();
    fetchCatgories();
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <Select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {batch.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </Select>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Industries</option>
          <option value={selectedCategory}>{selectedCategory}</option>
          {category.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </Select>
      </div>

      <>
        {data}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["YC"], { substringMatch: true })) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.
  let batch;
  for (const key in Batches) {
    if (query.includes(key)) {
      batch = key;
    }
  }
  let data = {
    batch: batch,
    category: query.split(" ")[0],
  };

  return data;
};

export { queryToData, Component };
