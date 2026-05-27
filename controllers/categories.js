const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('cse341videogamesDB').collection('categories').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createCategory = async (req, res) => {
  const validationRule = { "name": "required|string", "description": "required|string" };
  validator(req.body, validationRule, {}, async (err, status) => {
    if (!status) return res.status(400).send(err);
    const category = { name: req.body.name, description: req.body.description };
    const response = await mongodb.getDb().db('cse341videogamesDB').collection('categories').insertOne(category);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json(response.error || 'Error al crear.');
  });
};

const updateCategory = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const category = { name: req.body.name, description: req.body.description };
  const response = await mongodb.getDb().db('cse341videogamesDB').collection('categories').replaceOne({ _id: userId }, category);
  if (response.modifiedCount > 0) res.status(204).send();
  else res.status(500).json(response.error || 'Error al actualizar.');
};

const deleteCategory = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('cse341videogamesDB').collection('categories').deleteOne({ _id: userId });
  if (response.deletedCount > 0) res.status(200).send();
  else res.status(500).json(response.error || 'Error al borrar.');
};

module.exports = { getAll, createCategory, updateCategory, deleteCategory };