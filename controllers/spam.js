'use strict';

// MODULE - SPAM CONTROLLER

// Required Modules
const dotenv = require('dotenv'); dotenv.config();
const { spawn, exec } = require('child_process');
const path = require('path');

// Spam Controller Class
class SpamController{

    constructor(){
        // ROUTE METHODS

        // Spam - GET
        this.GET = (req,res) => {
            try{
                res.status(200).json({ 
                    success: true,
                    route: '/spam',
                    request: 'GET',
                    description: 'Spam Prediction Using Naive Bayes Model'
                });
            }
            catch(error){
                res.status(500).json({ success: false, message: 'Server Error!' });
                console.error(`SpamController.GET Error : ${error}`);
            }
        }
        
    }

}

// Exporting Spam Controller Instance
module.exports = new SpamController();

