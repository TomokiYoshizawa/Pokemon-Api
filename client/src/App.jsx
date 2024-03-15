/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import Card from "./components/Card/Card";

import { getAllPokemon } from "./utils/pokemoUtils";
import { getPokemon } from "./utils/pokemoUtils";
import { getSearchPokemon } from "./utils/pokemoUtils";

import "./App.scss";

function App() {
  const pokeApi = "https://pokeapi.co/api/v2/pokemon";
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //get all pokemon
      let res = await getAllPokemon(pokeApi);

      //get a single pokemon
      loadPokemon(res.results);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
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

  const handlePrevPage = async () => {
    if (!prevUrl) return;

    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  //search for a pokemon
  const handleSearch = async () => {
    if (search.trim()) {
      setLoading(true);
      try {
        const res = await getSearchPokemon(
          `${pokeApi}/${search.toLowerCase()}`
        );
        if (res && res.name) {
          // 検索が成功してポケモンが見つかった場合
          setPokemonData([res]);
        } else {
          alert("Pokemon not found."); // 検索に失敗した場合、アラートを表示するだけ
        }
      } catch (error) {
        console.error("Error fetching pokemon data:", error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app__btn-box">
        <button className="app__btn" onClick={handlePrevPage}>
          Prev
        </button>
        <div className="app__search">
          <input
            className="app__search-input"
            type="text"
            placeholder="Search for a pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="app__search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="app__btn" onClick={handleNextPage}>
          Next
        </button>
      </div>

      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div className="app__pokemon-container">
            {pokemonData.map((pokemon, index) => {
              return <Card key={index} pokemon={pokemon} />;
            })}
          </div>
          <div className="app__btn-box">
            <button className="app__btn" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="app__btn" onClick={handleNextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
