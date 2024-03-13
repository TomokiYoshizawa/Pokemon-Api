/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import Card from "./components/Card/Card";

import { getAllPokemon } from "./utils/pokemoUtils";
import { getPokemon } from "./utils/pokemoUtils";

import "./App.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      const pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=20";
      let allPokemons = [];
      let nextUrl = pokeApi;

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allPokemons = allPokemons.concat(data.results);
        nextUrl = data.next;
      }

      // 各ポケモンの詳細データを取得
      const pokemonDetails = await Promise.all(
        allPokemons.map(async (pokemon) => {
          return getPokemon(pokemon.url); // 既存の関数を使用
        })
      );

      setPokemonData(pokemonDetails);
      setLoading(false);
    };

    fetchAllPokemonData();
  }, []);
  // const pokeApi = "https://pokeapi.co/api/v2/pokemon";
  // const [loading, setLoading] = useState(true);
  // const [pokemonData, setPokemonData] = useState([]);

  // useEffect(() => {
  //   const fetchPokemonData = async () => {
  //     //get all pokemon
  //     let res = await getAllPokemon(pokeApi);

  //     //get a single pokemon
  //     loadPokemon(res.results);
  //     setLoading(false);
  //   };
  //   fetchPokemonData();
  // }, []);

  // const loadPokemon = async (data) => {
  //   let _pokemonData = await Promise.all(
  //     data.map((pokemon) => {
  //       // console.log(pokemon);
  //       let pokemonRecord = getPokemon(pokemon.url);
  //       return pokemonRecord;
  //     })
  //   );
  //   setPokemonData(_pokemonData);
  // };

  // console.log(pokemonData);
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
