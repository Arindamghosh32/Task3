const axios = require("axios");

exports.createPost = async (req, res) => {
  try {
    console.log("Fetching quote from API using Axios...");
    const response = await axios.get("https://dummyjson.com/quotes/random");

    const data = response.data; 
    console.log("Data received:", data);

    res.json({
      text: data.quote,
      author: data.author
    });
  } catch (err) {
    console.error("Error fetching quotes from API:", err.message);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
};
