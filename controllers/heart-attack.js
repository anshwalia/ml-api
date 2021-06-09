'use strict';

// MODULE - HEART ATTACK CONTROLLER

// Required Modules
const dotenv = require('dotenv'); dotenv.config();
const path = require('path');
const { exec, spawn } = require('child_process');

// Heart Attack Controller Class
class HeartAttackController{

    constructor(){

        // ROUTE METHODS

        // GET - Method
        this.GET = (req,res) => {
            try{
                res.status(200).json({ success: true, message: 'Heart Attack Controller - GET' });
            }
            catch(error){
                res.status(500).json({ success: false, message: 'Server Error!' });
                console.error(`Heart Attack Controller -> GET [Error] : ${error}`);
            }
        }

        // POST - Method
        this.POST = (req,res) => {
            try{
                res.status(200).json({ success: true, message: 'Heart Attack Controller - POST' });
            }
            catch(error){
                res.status(500).json({ success: false, message: 'Server Error!' });
                console.error(`Heart Attack Controller -> POST [Error] : ${error}`);
            }
        }

        // GENERAL METHODS

        // Method To Predict Heart Attack
        this.predictHeartAttack = (input) => {
            return new Promise((resolve,reject) => {
                try{
                    // Activating Python Virtual Environment
                    exec(process.env.PYENV,(error,stdout,stderr) => {
                        if(error) throw error;
                        if(stderr) throw new Error(`Command Error : ${stderr}`);
                        else{
                            // Python Script Path
                            const pyScript = path.resolve(__dirname,'../py-scripts/heart-attack.py');
                            // Model Input Scaler Path
                            const pyInputScaler = path.resolve(__dirname,'../py-models/heart-attack/input-scaler');
                            // Machine Learning Model Path
                            const pyModel = path.resolve(__dirname,'../py-models/heart-attack/model');
                            // Python Model Script - Child Process
                            const pyProcess = spawn('python',[pyScript,pyInputScaler,pyModel,JSON.stringify(input)]);
                            
                        }
                    });
                }
                catch(error){ reject(error); }
            });
        }

    }
}

// Exporting Heart Attack Controller Instance
module.exports = new HeartAttackController();