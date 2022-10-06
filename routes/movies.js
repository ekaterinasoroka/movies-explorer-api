const express = require('express');
const moviesRoutes = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validationJoi');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validationJoi');

moviesRoutes.use(express.json());
<<<<<<< HEAD
moviesRoutes.get('/movies', getMovies);
moviesRoutes.post('/movies', validateCreateMovie, createMovie);
=======
moviesRoutes.get('/movies', validateCreateMovie, getMovies);
moviesRoutes.post('/movies', createMovie);
>>>>>>> 6e7d0e030cf482bb468cc4b63790f91519f15668
moviesRoutes.delete('/movies/:movieId', validateDeleteMovie, deleteMovieById);

module.exports = moviesRoutes;
