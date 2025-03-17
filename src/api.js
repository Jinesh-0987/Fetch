import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

// Login API Call
export const login = async (name, email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { name, email },
      { withCredentials: true } // authentication cookies
    );
    return response.status === 200;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

// Fetch Breeds API Call
export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs/breeds`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return [];
  }
};

// Search Dogs API Call
export const searchDogs = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs/search`, {
      params: filters,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching dogs:", error);
    return [];
  }
};

// Fetch Dog Details API Call
export const fetchDogDetails = async (dogIds) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/dogs`,
      dogIds,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dog details:", error);
    return [];
  }
};
