const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('cse341videogamesDB').collection('games').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error al obtener los juegos.' });
  }
};

const createGame = async (req, res) => {
  try {
    // Nota: Aquí podrías ser más flexible con la validación si lo necesitas
    const game = { 
      name: req.body.name, 
      genre: req.body.genre,
      developer: req.body.developer,
      releaseYear: req.body.releaseYear,
      platform: req.body.platform,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer
    };
    const response = await mongodb.getDb().db('cse341videogamesDB').collection('games').insertOne(game);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error al crear el juego.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error interno del servidor.' });
  }
};

const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "La petición no puede estar vacía." });
    }

    if (!req.body.name || !req.body.genre) {
      return res.status(400).json({ message: "Datos incompletos. Se requiere 'name' y 'genre'." });
    }

    const game = {
      name: req.body.name,
      genre: req.body.genre,
      developer: req.body.developer,
      releaseYear: req.body.releaseYear,
      platform: req.body.platform,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer
    };

    const response = await mongodb.getDb().db().collection('games').replaceOne({ _id: new ObjectId(gameId) }, game);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "No se encontró el juego con ese ID." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || "Error al actualizar." });
  }
};

const deleteGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('cse341videogamesDB').collection('games').deleteOne({ _id: gameId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json('No se encontró el juego.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error al borrar.' });
  }
};

module.exports = { getAll, createGame, updateGame, deleteGame };