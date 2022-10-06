const express = require('express');

const usersRoutes = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/users');

usersRoutes.use(express.json());

usersRoutes.get('/users/me', getUserInfo);
usersRoutes.patch('/users/me', updateProfile);

module.exports = usersRoutes;
