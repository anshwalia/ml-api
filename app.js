'use strict';

// Node Modules
const path = require('path');
const fs = require('fs');

// Express Module
const express = require('express');

// Morgan Logger
const morgan = require('morgan');

// Express App
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routers
const salary = require('./routes/salary');

// ROUTES

// Root - GET
app.get('/',(req,res) => {
    try{
        res.status(200).json({ 
            success: true,
            routes: JSON.parse(fs.readFileSync(path.resolve(__dirname,'./routes.json')))
        });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Server Error!'});
        console.error(error);
    }
});

// Route - Salary
app.use('/salary',salary);


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
