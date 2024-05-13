// Import required modules
const express = require("express");
const {MongoClient} = require("mongodb")
const dotenv = require("dotenv");
dotenv.config();

// Your MongoDB connection URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware for parsing JSON bodies

// Connect to MongoDB and start the server
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Example route
    app.get('/download/', (req, res) => {
        res.send('Hello from the backend with MongoDB!');
      });

    // Listen to the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (e) {
    console.error(e);
  } finally {
    // Optionally close the connection
    // await client.close();
  }
}

run().catch(console.error);
