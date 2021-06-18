'use strict';

// MODULE - SPAM ROUTER

// Required Modules
const { Router } = require('express');

// Spam Controller
const SpamController = require('../controllers/spam');

// Spam Router Instance
const SpamRouter = new Router();

// Routes

// GET
SpamRouter.get('/',SpamController.GET);

SpamRouter.post('/',SpamController.POST);

// Exporting Spam Router
module.exports = SpamRouter;