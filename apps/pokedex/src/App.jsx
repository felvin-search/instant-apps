import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from 'axios';

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.color};
  border-radius: 10px;
  background-color: #eee;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TopBox = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  padding: 1rem 0;
  background-color: ${props => props.color};
  text-transform: uppercase;
`;

const ImageBox = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TypeTag = styled.div`
  margin-top: .5rem;
  padding: .5rem .8rem;
  background-color: #ddd;
  border-radius: 5px;
`;

const ProfileBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-right: 1rem;
`;

const Profile = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AbilityList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Ability = styled.div`
  padding: .3rem 0;
`;

const StatsBox = styled.div`
  width: 80%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StatsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  padding: .5rem 0;
  font-sze: 1rem;
  background-color: ${props => props.color};
`;

const Stat = styled.div`
  width: 100%;
  margin: .5rem 0;
  padding: .4rem .6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: transparent;
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: ${prop => prop.filled}%;
    min-height: 100%;
    background-color: ${props => props.color};
    z-index: 1;
    border-radius: 5px;
    opacity: .5;
  }
`;

const StatText = styled.div`
  z-index: 2;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container color={data.color}>

      <TitleBox color={data.color}>{data.name}</TitleBox>

      <TopBox>

        <ImageBox>
          <img src={data.imgURL} width="120px"></img>
          {data.types.map((type) => {
            return (<TypeTag>{type}</TypeTag>)
          })}
        </ImageBox>

        <ProfileBox>

          <Profile>
            <div>Weight</div>
            <div>{`${data.weight} Kg`}</div>
          </Profile>

          <Profile>
            <div>Height</div>
            <div>{`${data.height} m`}</div>
          </Profile>

          <Profile>
            <div>Abilities</div>
            <AbilityList>
              {data.abilities.map((ability) => {
                return(<Ability>{ability}</Ability>)
              })}
            </AbilityList>
          </Profile>

        </ProfileBox>

      </TopBox>

      <StatsTitle color={data.color}>Stats</StatsTitle>

      <StatsBox>
          {data.stats.map((stat) => {
            return (
            <Stat filled={stat.stat*100/500} color={data.color}>
              <StatText>{`${stat.name}`}</StatText>
              <StatText>{`${stat.stat}`}</StatText>
            </Stat>)
          })}
        </StatsBox>

    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {

  if (!isTriggered(query, [ "stats","info" ], {substringMatch: true})) {
    return;
  }
  var triggerWords = query.split(' ');
  triggerWords = triggerWords.filter((word) => (word !== "stats" && word !== "info"));
  const apiRequest = triggerWords.join('-');
  var pokemonData = null;

  try {
    pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${apiRequest}`);
  }
  catch (err) {
    console.log(err);
    return;
  }

  const speciesData = await axios.get(pokemonData.data.species.url);
  const types = pokemonData.data.types.map((type) => type.type.name);
  const abilities = pokemonData.data.abilities.map((ability) => ability.ability.name);
  const stats = pokemonData.data.stats.map((stat) => {
    return ({
        stat: stat.base_stat,
        name: stat.stat.name
      }
    )
  });
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const myPokemonData = {
    name: pokemonData.data.name,
    height: pokemonData.data.height/10,
    weight: pokemonData.data.weight/10,
    imgURL: pokemonData.data.sprites.front_default,
    color: speciesData.data.color.name,
    types: types,
    abilities: abilities,
    stats: stats
  }

  return myPokemonData;
}

export { queryToData, Component };
