'use strict';

// MODULE - HEART ATTACK CONTROLLER

// Required Modules
const dotenv = require('dotenv'); dotenv.config();
const path = require('path');
const { exec, spawn } = require('child_process');

// Configuration Module
const CONFIG = require('./config');

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
                const { vitals } = req.body;
                if(vitals.length === 13){
                    this.predictHeartAttack(vitals)
                    .then((result) => {
                        if(result !== null){ 
                            // Response
                            res
                            .status(200)
                            .json({ 
                                ok: true,
                                status: 'success', 
                                heart_attack_chance: ((result === 1) ? true:false) 
                            }); 
                        }
                        else{
                            // SERVER ERROR - RESPONSE
                            res
                            .status(500)
                            .json({ 
                                ok: false,
                                status: 'failed', 
                                message: "Server Error" 
                            });
                        }
                    }).catch((error) => { throw error });
                }
                else{
                    // INVALID INPUT - RESPONSE
                    res
                    .status(308)
                    .json({
                        ok: false, 
                        'status': 'failed', 
                        message: 'Invalid Input! Vitals count should be 13 total.' 
                    });
                }
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
                    exec(CONFIG.pythonVenv(),(error,stdout,stderr) => {
                        if(error) throw error;
                        if(stderr) throw new Error(`Command Error : ${stderr}`);
                        else{
                            console.log("[PYTHON VENV ACTIVATED]");
                            // Python Script Path
                            const pyScript = path.resolve(__dirname,'../py-scripts/heart-attack.py');
                            // Model Input Scaler Path
                            const pyInputScaler = path.resolve(__dirname,'../py-models/heart-attack/input-scaler');
                            // Machine Learning Model Path
                            const pyModel = path.resolve(__dirname,'../py-models/heart-attack/model');
                            // Python Model Script - Child Process
                            const pyProcess = spawn('python',[pyScript,pyInputScaler,pyModel,JSON.stringify(input)]);
                            // Standard Output
                            pyProcess.stdout.on('data',(output) => {
                                output = Number(output.toString('utf-8').substr(0,output.length-2));
                                resolve(output);
                            });
                            // Standard Error
                            pyProcess.stderr.on('error',(error) => { 
                                if(error) throw new Error(`STDERR : ${error}`);
                            });
                            // Exit Code
                            pyProcess.on('close',(exitCode) => {
                                if(exitCode != 0){ throw new Error(`Exit Code : ${exitCode}`); }
                            });
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