import React from "react";

function Card({ pokemon }) {
  return (
    <div className="card">
      <div className="card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="card__name">{pokemon.name}</h3>
      <div className="card__type">
        <p>Type</p>
        {pokemon.types.map((type, index) => {
          return (
            <div key={index}>
              <span className="card__type-name">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="card__info">
        <div className="card__data">
          <p className="card__data-title">weight: {pokemon.weight}</p>
        </div>
        <div className="card__data">
          <p className="card__data-title">height: {pokemon.height}</p>
        </div>
        {pokemon.abilities.map((ability, index2) => {
          return (
            <div key={index2} className="card__data">
              <p className="card__data-title">
                ability: {ability.ability.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
