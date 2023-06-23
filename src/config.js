let BASE_URL = "";
let URL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "https://pankajtraders.co.in/api/";
  URL = "https://pankajtraders.co.in/api/";
} else {
  BASE_URL = "https://pankajtraders.co.in/api/"; 
  URL = "https://pankajtraders.co.in/api/"; 
}
const config = {
  BASE_URL,
  URL,
};

export default config;