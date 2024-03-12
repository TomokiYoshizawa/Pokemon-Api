export const getAllPokemon = async (url) => {
  //   Promise function creates new object, and calls resolve when the fetch is successful and reject when it fails.
  //   resolve return a promise(result) of the successful fetch to where it's called
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = async (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};
