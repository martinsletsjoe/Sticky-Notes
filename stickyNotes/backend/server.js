const cors = require("cors");
const express = require("express");
const {MongoClient} = require("mongodb")


const app = express();
const port = 3001;
const url = "mongodb://localhost:27017/"
const dbName = "StickyNotes";

app.use(express.json());
app.use(cors());

const client = new MongoClient(url);

async function connectToMongo(){
    try{
        await client.connect();
        console.log("jadda")
    } catch (error) {
        console.log("neida")
    }
}

app.post("/notes", async (req, res) => {
    try {
        const db = client.db(dbName);
        const notesCollection = db.collection("notes");
        const {text} = req.body;
        const newNote = {
            text: text,
            createdAt: new Date()
        };
        const result = await notesCollection.insertOne(newNote);
        res.status(201).json(result);
    } catch (error) {
        console.error("failed to create note", error);
        res.status(500).json({message: "failed to create note"});
    }
})

app.get("/notes", async (req, res) => {
    try {
        const db = client.db(dbName);
        const notesCollection = db.collection("notes")
        const notes = await notesCollection.find({}).toArray();
        res.status(200).json(notes);
    }catch (error) {
        console.log("Failed to fetch notes", error);
        res.status(500).json({message: "failed to fetch notes."})
    }
})

app.get("/", (req, res) => {
    res.send(`<h1>Server is running</h1>`)
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
    connectToMongo();
})
