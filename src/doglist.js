import { useState, useEffect } from "react";
import { fetchBreeds, searchDogs, fetchDogDetails } from "../api";
import DogCard from "./dogcard";

const DogList = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const loadBreeds = async () => {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    };
    loadBreeds();
  }, []);

  const handleSearch = async () => {
    const dogIds = await searchDogs({ breeds: selectedBreed ? [selectedBreed] : undefined });
    const dogDetails = await fetchDogDetails(dogIds);
    setDogs(dogDetails);
  };

  return (
    <div>
      <h2>Find a Dog</h2>
      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>
      <div className="dog-list">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
};

export default DogList;
