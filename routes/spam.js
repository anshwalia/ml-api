'use strict';

// MODULE - SPAM ROUTER

// Required Modules
const { Router } = require('express');

// Spam Controller
const spam = require('../controllers/spam');

// Spam Router Instance
const SpamRouter = new Router();

// Routes

// GET
SpamRouter.get('/',spam.GET);


// Exporting Spam Router
module.exports = SpamRouter;