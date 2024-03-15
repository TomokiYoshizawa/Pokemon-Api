export const getAllPokemon = async (url) => {
  //   Promise function creates new object, and calls resolve when the fetch is successful and reject when it fails.
  //   resolve return a promise(result) of the successful fetch to where it's called
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = async (url) => {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export const getSearchPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Pokemon not found: ${res.status}`);
        return res.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        alert("Pokemon not found.");
        reject(error);
      });
  });
};

// export const getSearchPokemon = async (url) => {
//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error(`Pokemon not found: ${res.status}`);
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching pokemon data:", error.message);
//     return null; // エラーが発生した場合はnullを返す
//   }
// };
