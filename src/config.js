let BASE_URL = "";
let URL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "https://jdpatidar.com/traders/";
  URL = "https://jdpatidar.com/traders/";
} else {
  BASE_URL = "https://jdpatidar.com/traders/"; 
  URL = "https://jdpatidar.com/traders/"; 
}
const config = {
  BASE_URL,
  URL,
};

export default config;