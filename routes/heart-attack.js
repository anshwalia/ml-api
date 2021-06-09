'use strict';

// MODULE - Heart Attack Router

// Required Modules
const { Router } = require('express');

// Heart Attack Controller
const HeartAttackController = require('../controllers/heart-attack');

// Heart Attack Router
const HeartAttackRouter = Router();

// ROUTES

// GET
HeartAttackRouter.get('/',HeartAttackController.GET);

// POST
HeartAttackRouter.post('/',HeartAttackController.POST);

// Exporting Heart Attack Router
module.exports = HeartAttackRouter;