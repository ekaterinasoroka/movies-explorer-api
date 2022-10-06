const express = require('express');
const moviesRoutes = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

moviesRoutes.use(express.json());
moviesRoutes.get('/movies', getMovies);
moviesRoutes.post('/movies', createMovie);
moviesRoutes.delete('/movies/:movieId', deleteMovieById);

module.exports = moviesRoutes;
