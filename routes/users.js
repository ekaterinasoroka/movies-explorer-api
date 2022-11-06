const express = require('express');

const usersRoutes = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/users');
const {
  validateUpdateProfile,
} = require('../middlewares/validationJoi');

usersRoutes.use(express.json());

usersRoutes.get('/users/me', getUserInfo);
usersRoutes.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = usersRoutes;
