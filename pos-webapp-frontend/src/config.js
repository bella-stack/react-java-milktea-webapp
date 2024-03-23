// src/config.js

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

// Assign the config object to a variable
const config = {
  REACT_APP_BACKEND_URL: backendUrl,
};

// Export the config object
export default config;
