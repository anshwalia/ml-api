'use strict';

// MODULE - SALARY ROUTER

// Required Modules
const { Router } = require('express');

// Salary Controller
const SalaryController = require('../controllers/salary');

// Salary Router
const SalaryRouter = Router();

// ROUTES
// Salary - GET
SalaryRouter.get('/',SalaryController.GET);
// Salary - POST
SalaryRouter.post('/',SalaryController.POST);

// Exporting Salary Router
module.exports = SalaryRouter;