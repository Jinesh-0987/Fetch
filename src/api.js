import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const login = async (name, email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { name, email }, { withCredentials: true });
    return response.status === 200;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs/breeds`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch breeds:", error);
    return [];
  }
};

export const searchDogs = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs/search`, { params: filters, withCredentials: true });
    return response.data.resultIds;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    return [];
  }
};

export const fetchDogDetails = async (dogIds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dogs`, dogIds, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dog details:", error);
    return [];
  }
};
