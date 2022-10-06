const express = require('express');
const moviesRoutes = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validationJoi');

moviesRoutes.use(express.json());
moviesRoutes.get('/movies', validateCreateMovie, getMovies);
moviesRoutes.post('/movies', createMovie);
moviesRoutes.delete('/movies/:movieId', validateDeleteMovie, deleteMovieById);

module.exports = moviesRoutes;
