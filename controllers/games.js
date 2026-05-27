const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('cse341videogamesDB').collection('games').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createGame = async (req, res) => {
  const validationRule = { "name": "required|string", "genre": "required|string" };
  validator(req.body, validationRule, {}, async (err, status) => {
    if (!status) return res.status(400).send(err);
    const game = { name: req.body.name, genre: req.body.genre };
    const response = await mongodb.getDb().db('cse341videogamesDB').collection('games').insertOne(game);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json(response.error || 'Error al crear.');
  });
};

const updateGame = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const game = { name: req.body.name, genre: req.body.genre };
  const response = await mongodb.getDb().db('cse341videogamesDB').collection('games').replaceOne({ _id: gameId }, game);
  if (response.modifiedCount > 0) res.status(204).send();
  else res.status(500).json(response.error || 'Error al actualizar.');
};

const deleteGame = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('cse341videogamesDB').collection('games').deleteOne({ _id: gameId });
  if (response.deletedCount > 0) res.status(200).send();
  else res.status(500).json(response.error || 'Error al borrar.');
};

module.exports = { getAll, createGame, updateGame, deleteGame };