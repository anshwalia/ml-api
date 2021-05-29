'use strict';

// MODULE - SALARY ROUTER

// Required Modules
const { Router } = require('express');

// Salary Controller
const salary = require('../controllers/salary');

// Salary Router
const SalaryRouter = Router();

// ROUTES
// Salary - GET
SalaryRouter.get('/',salary.GET);
// Salary - POST
SalaryRouter.post('/',salary.POST);

// Exporting Salary Router
module.exports = SalaryRouter;