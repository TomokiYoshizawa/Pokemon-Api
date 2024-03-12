import React, { useEffect, useState } from "react";

import Card from "./components/Card/Crad";

import { getAllPokemon } from "./utils/pokemoUtils";
import { getPokemon } from "./utils/pokemoUtils";

import "./App.css";

function App() {
  const pokeApi = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //get all pokemon
      let res = await getAllPokemon(pokeApi);

      //get a single pokemon
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);
  return (
    <div className="app">
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="app__pokemon-container">
          {pokemonData.map((pokemon, index) => {
            return <Card key={index} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
