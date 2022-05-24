import { useEffect, useState, useContext } from "react";

import Results from "./Results";
import ThemeContext from "../context/ThemeContext";
import useBreedList from "../hooks/useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit"];
const THEMES = ["#183a1d", "#f6c453", "#fefbe9", "#f0a04b", "#e1eedd"]

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [pets, setPets] = useState([]);
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");

  const [theme, setTheme] = useContext(ThemeContext);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option
                key={animal}
                value={animal}
              >
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((selectBreed) => (
              <option
                key={selectBreed}
                value={selectBreed}
              >
                {selectBreed}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru"></option>
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((selectTheme) => (
              <option
                value={selectTheme}
                key={selectTheme}
              >
                {selectTheme}
              </option>
            ))}
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>

      <Results pets={pets}/>

    </div>
  );
};

export default SearchParams;
