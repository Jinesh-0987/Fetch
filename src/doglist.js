import React, { useEffect, useState } from "react";
import { fetchBreeds, searchDogs, fetchDogDetails } from "./api";
import { FaHeart, FaHeartBroken, FaSortAlphaDown, FaSortAlphaUp, FaTimes } from "react-icons/fa";

function DogList() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [bestMatch, setBestMatch] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadBreeds() {
      try {
        const breedData = await fetchBreeds();
        setBreeds(breedData);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    }
    loadBreeds();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [page, sortOrder, selectedBreed]);

  const handleSearch = async () => {
    const queryParams = {
      breeds: selectedBreed ? [selectedBreed] : [],
      sort: `name:${sortOrder}`,
      size: 10,
      from: page * 10,
    };

    try {
      const response = await searchDogs(queryParams);
      if (response && response.resultIds) {
        const dogDetails = await fetchDogDetails(response.resultIds);
        setDogs(dogDetails);
      } else {
        setDogs([]);
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFavorite = (dog) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === dog.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== dog.id));
    } else {
      setFavorites([...favorites, dog]);
    }
  };

  const findBestMatch = async () => {
    if (favorites.length === 0) {
      alert("Please add some dogs to favorites first.");
      return;
    }
    try {
      const favoriteIds = favorites.map((dog) => dog.id);
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteIds),
      });
      const match = await response.json();

      const matchedDogDetails = await fetchDogDetails([match.match]);
      setBestMatch(matchedDogDetails[0]);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching best match:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🐶 Dog Finder</h2>

      {/* Dropdown + Sort */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
        <select 
          onChange={(e) => setSelectedBreed(e.target.value)}
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            backgroundColor: "#f8f9fa"
          }}
        >
          <option value="">🐾 Select a Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>

        <button onClick={handleSort} style={{ padding: "6px 10px", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
          {sortOrder === "asc" ? <><FaSortAlphaDown /> A-Z</> : <><FaSortAlphaUp /> Z-A</>}
        </button>
      </div>

      {/* Display Dogs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", justifyContent: "center", padding: "10px" }}>
        {dogs.map((dog) => (
          <div key={dog.id} style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            backgroundColor: "#fff"
          }}>
            <img src={dog.img} alt={dog.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px" }} />
            <p><strong>{dog.name}</strong> - {dog.breed}</p>
            <button onClick={() => handleFavorite(dog)} style={{ padding: "5px", background: favorites.some((fav) => fav.id === dog.id) ? "red" : "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              {favorites.some((fav) => fav.id === dog.id) ? <FaHeartBroken /> : <FaHeart />} {favorites.some((fav) => fav.id === dog.id) ? "Remove" : "Favorite"}
            </button>
          </div>
        ))}
      </div>

      {/* Favorite Dogs List */}
      {favorites.length > 0 && (
        <div style={{ marginTop: "30px", padding: "20px", background: "#f8f9fa", borderRadius: "10px" }}>
          <h3>❤️ Your Favorite Dogs</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
            {favorites.map((dog) => (
              <div key={dog.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", textAlign: "center", width: "150px", background: "#fff" }}>
                <img src={dog.img} alt={dog.name} style={{ width: "100%", height: "100px", objectFit: "cover" }} />
                <p>{dog.name}</p>
                <button onClick={() => handleFavorite(dog)} style={{ background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px", borderRadius: "5px" }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Find Best Match */}
      <button onClick={findBestMatch} style={{ padding: "8px 12px", margin: "15px", backgroundColor: "#ff4500", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        🏆 Find Best Match
      </button>

      {/* Best Match Popup */}
      {showModal && bestMatch && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          backgroundColor: "white", padding: "20px", borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", textAlign: "center", zIndex: "1000",
          width: "320px", display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <button onClick={() => setShowModal(false)} style={{ alignSelf: "flex-end", border: "none", background: "none", fontSize: "20px", cursor: "pointer" }}>
            <FaTimes />
          </button>
          <h3>🐾 Your Best Match!</h3>
          <img src={bestMatch.img} alt={bestMatch.name} style={{ width: "100%", borderRadius: "10px" }} />
          <p><strong>{bestMatch.name}</strong> - {bestMatch.breed}</p>
        </div>
      )}
    </div>
  );
}

export default DogList;
