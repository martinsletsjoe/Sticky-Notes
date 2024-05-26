const cors = require("cors");
const express = require("express");
const {MongoClient, ObjectId} = require("mongodb")


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

        if(result.acknowledged) {
            res.status(201).json({id: result.insertedId, ...newNote})
        }else{
            res.status(400).json({message: "Note could not be added."})
        }
        // res.status(201).json(result);
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

app.patch("/notes/:id", async (req, res) =>{
    const {id} = req.params;
    const {text} = req.body;

    try {
        const db = client.db("StickyNotes");
        const notesCollection = db.collection("notes");
        const result = await notesCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {text: text}}
        );

        if(result.modifiedCount === 0) {
            return res.status(404).json({message: "no notes found with that ID"});
        }

        res.json({message: "Note updated successfully"})
    }catch (error) {
        console.error("failed to update note", error);
        res.status(500).json({message: "Failed to update note"});
    }
})

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete note with ID:", id);  // Log the ID
    try {
        const db = client.db("StickyNotes");
        const notesCollection = db.collection("notes");
        const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(204).send();  // No Content, indicates successful deletion
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error("Failed to delete note:", error);
        res.status(500).json({ message: "Failed to delete note" });
    }
});


app.get("/", (req, res) => {
    res.send(`<h1>Server is running</h1>`)
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
    connectToMongo();
})
