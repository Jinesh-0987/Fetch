import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const login = async (name, email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { name, email },
      { withCredentials: true } // Required for authentication cookies
    );
    return response.status === 200;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
