const express = require('express');

const usersRoutes = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/users');
const {
  validateUserInfo,
  validateUpdateProfile,
} = require('../middlewares/validationJoi');

usersRoutes.use(express.json());

usersRoutes.get('/users/me', validateUserInfo, getUserInfo);
usersRoutes.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = usersRoutes;
