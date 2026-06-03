const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('cse341videogamesDB').collection('categories').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error al obtener las categorías.' });
  }
};

const createCategory = async (req, res) => {
  try {
    const validationRule = { "name": "required|string", "description": "required|string" };
    validator(req.body, validationRule, {}, async (err, status) => {
      if (!status) {
        return res.status(400).send(err);
      }
      // He añadido campos extra para llegar a 7
      const category = { 
        name: req.body.name, 
        description: req.body.description,
        type: req.body.type,
        popularity: req.body.popularity,
        active: req.body.active,
        createdYear: req.body.createdYear,
        language: req.body.language
      };
      const response = await mongodb.getDb().db('cse341videogamesDB').collection('categories').insertOne(category);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Error al crear la categoría.');
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error interno del servidor al crear.' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "El cuerpo de la petición no puede estar vacío." });
    }

    if (!req.body.name || !req.body.type) {
      return res.status(400).json({ message: "Datos incompletos: 'name' y 'type' son obligatorios." });
    }

    const category = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      popularity: req.body.popularity,
      active: req.body.active,
      createdYear: req.body.createdYear,
      language: req.body.language
    };

    const response = await mongodb.getDb().db().collection('categories').replaceOne(
      { _id: new ObjectId(categoryId) }, 
      category
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "No se encontró la categoría con ese ID." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || "Error al actualizar." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('cse341videogamesDB').collection('categories').deleteOne({ _id: categoryId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json('No se encontró la categoría para borrar.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error al borrar la categoría.' });
  }
};

module.exports = { getAll, createCategory, updateCategory, deleteCategory };