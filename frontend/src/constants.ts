// Make sure when ejecting with create-react-app, update this environment variable using webpack.
// TODO: Move SERVER_URL to .env

// Uncomment below line to use **real results** in Testing
// export const SERVER_URL = "http://127.0.0.1:8000"
export const SERVER_URL =
  process.env.REACT_APP_MODE !== "production"
    ? "http://127.0.0.1:8000"
    : "https://felvin.com";

export const SERVER_API_URL =
  process.env.REACT_APP_MODE !== "production"
    ? `${SERVER_URL}/dev`
    : `${SERVER_URL}/api`;

export const RESULTS_URL = `${SERVER_API_URL}/results`;
