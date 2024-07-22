import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const router = express.Router();

// Record routes
router.get('/', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('records');
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching records');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('records');
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching record');
  }
});

router.post('/', async (req, res) => {
  try {
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const collection = mongoose.connection.db.collection('records');
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding record');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    const collection = mongoose.connection.db.collection('records');
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating record');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = mongoose.connection.db.collection('records');
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting record');
  }
});

export default router;
