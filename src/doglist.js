import { useState, useEffect } from "react";

function DogList() {
    const [dogs, setDogs] = useState([]); // Store fetched dogs
    const [breeds, setBreeds] = useState([]); // Store available breeds
    const [selectedBreed, setSelectedBreed] = useState(""); // Selected breed filter
    const [favorites, setFavorites] = useState([]); // Favorite dogs
    const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const pageSize = 10; // Number of dogs per page

    // **Fetch available breeds**
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
                    credentials: "include",
                });
                const data = await response.json();
                setBreeds(data);
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        };
        fetchBreeds();
    }, []);

    // **Fetch dogs based on filters**
    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const queryParams = new URLSearchParams({
                    size: pageSize,
                    from: (currentPage - 1) * pageSize,
                    sort: `breed:${sortOrder}`,
                });

                if (selectedBreed) {
                    queryParams.append("breeds", selectedBreed);
                }

                const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch dogs");
                }

                const data = await response.json();
                setDogs(data.resultIds);
            } catch (error) {
                console.error("Error fetching dogs:", error);
            }
        };
        fetchDogs();
    }, [selectedBreed, sortOrder, currentPage]);

    // **Toggle favorite selection**
    const toggleFavorite = (dogId) => {
        setFavorites((prev) =>
            prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
        );
    };

    // **Match favorite dogs**
    const matchDog = async () => {
        if (favorites.length === 0) {
            alert("Please select at least one favorite dog.");
            return;
        }

        try {
            const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(favorites),
            });

            if (!response.ok) {
                throw new Error("Matching failed");
            }

            const match = await response.json();
            alert(`Your matched dog ID is: ${match.match}`);
        } catch (error) {
            console.error("Error matching dog:", error);
        }
    };

    return (
        <div>
            <h2>Available Dogs</h2>

            {/* Filter Section */}
            <div>
                <label>Filter by Breed:</label>
                <select onChange={(e) => setSelectedBreed(e.target.value)} value={selectedBreed}>
                    <option value="">All Breeds</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>{breed}</option>
                    ))}
                </select>
            </div>

            {/* Sorting */}
            <div>
                <label>Sort by Breed:</label>
                <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                </button>
            </div>

            {/* Dog List */}
            <ul>
                {dogs.map((dogId) => (
                    <li key={dogId}>
                        <span>Dog ID: {dogId}</span>
                        <button onClick={() => toggleFavorite(dogId)}>
                            {favorites.includes(dogId) ? "Unfavorite" : "Favorite"}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </button>
                <span> Page {currentPage} </span>
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>

            {/* Match Button */}
            <button onClick={matchDog} disabled={favorites.length === 0}>
                Find My Match
            </button>
        </div>
    );
}

export default DogList;
