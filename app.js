'use strict';

// Node Modules
const path = require('path');
const fs = require('fs');

// Express Module
const express = require('express');

// Morgan Logger
const morgan = require('morgan');

// CORS Module
const cors = require('cors');

// Express App
const app = express();

// Express Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routers
const SalaryRouter = require('./routes/salary');
const SpamRouter = require('./routes/spam');
const HeartAttackRouter = require('./routes/heart-attack');

// ROUTES

// Root - GET
app.get('/',(req,res) => {
    try{
        res.status(200).json({
            success: true,
            title: "Machine Learning API",
            routes: JSON.parse(fs.readFileSync(path.resolve(__dirname,'./routes.json')))
        });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Server Error!'});
        console.error(error);
    }
});

// Route - Salary
app.use('/salary',SalaryRouter);

// Route - Spam
app.use('/spam',SpamRouter);

// Route - Heart Attack
app.use('/heart-attack',HeartAttackRouter);


// Invalid Routes
app.get('*',(req,res) => {
    try{
        res.status(404).json({ success: true, message: 'Not Found!' });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Server Error!' });
        console.error(error);
    }
});



// Exporting Express App
module.exports = app;
