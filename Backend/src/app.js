let express = require("express");
const noteModel = require("./model/noteModel");

let app = express();
app.use(express.json());

let path = require("path");

let cors = require("cors");
app.use(cors());
app.use(express.static("./public"));

app.get("/api/notes", async (req, res) => {
  let note = await noteModel.find();

  res.status(200).json({ messasge: "Data Retrieved", note });
});

app.post("/api/notes", async (req, res) => {
  let { title, description } = req.body;

  let note = await noteModel.create({ title, description });

  res.status(201).json({ message: "Data Posted", note });
});

app.delete("/api/notes/:id", async (req, res) => {
  let id = req.params.id;

  let note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({ message: "data Deleted" });
});

app.patch("/api/notes/:id", async (req, res) => {
  let id = req.params.id;

  let updateData = {};
  let { title, description } = req.body;

  if (!title && !description) {
    res.status(200).json({ message: "No data to update" });
    return;
  }

  if (title && description) {
    updateData = { title, description };
    res.status(200).json({ message: "Title and desc updated" });
    return;
  }

  if (title) {
    updateData = { title };
    res.status(200).json({ message: "Title was updated" });
    return;
  }

  if (description) {
    updateData = { description };
    res.status(200).json({ message: "Description was updated" });
    return;
  }

  let note = await noteModel.findByIdAndUpdate(id, updateData);
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
