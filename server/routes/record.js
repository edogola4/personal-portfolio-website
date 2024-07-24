import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const recordSchema = new mongoose.Schema({
  name: String,
  position: String,
  level: String
});

const Record = mongoose.model('Record', recordSchema);

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    const results = await Record.find({});
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving records");
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const result = await Record.findById(req.params.id);
    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving record");
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    const newRecord = new Record({
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    });
    const result = await newRecord.save();
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const result = await Record.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const result = await Record.findByIdAndDelete(req.params.id);
    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
