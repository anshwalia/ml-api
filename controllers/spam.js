'use strict';

// MODULE - SPAM CONTROLLER

// Required Modules
const dotenv = require('dotenv'); dotenv.config();
const { spawnSync , exec } = require('child_process');
const path = require('path');

// Configuration Module
const CONFIG = require('./config');

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

        // Spam - POST
        this.POST = (req,res) => {
            try{
                const { text } = req.body;
                if(typeof(text) === 'string'){
                    
                    this.checkSpam(text)
                    .then((result) => {
                        if(result != null){ 
                            res
                            .status(200)
                            .json({ 
                                ok: true,
                                status: 'success', 
                                spam: (result === 1) ? true:false
                            }); 
                        }
                        else{ 
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
                    res.status(308).json({ success: false, message: 'Invalid Input!'});
                }
            }
            catch(error){
                res.status(500).json({ success: false, message: 'Server Error!' });
                console.error(`SpamController.POST Error : ${error}`);
            }
        }
        
        // GENERAL METHODS

        this.getFilePaths = () => {
            return new Promise((resolve,reject) => {
                try{
                    // Python Script Path
                    const pyScript = path.resolve(__dirname,'../py-scripts/spam.py');
                            
                    // Model Input Scaler Path
                    const pyVectorizer = path.resolve(__dirname,'../py-models/spam/vectorizer');
                    
                    // Machine Learning Model Path
                    const pyModel = path.resolve(__dirname,'../py-models/spam/model');

                    resolve([pyScript,pyVectorizer,pyModel,]);
                }
                catch(error){ reject(error); }
            });
        }

        // Method for running python script to classify spam
        this.checkSpam = async function(input=""){
            return new Promise((resolve,reject) => {
                try{
                    // Activating Python Virtual Environment
                    exec(CONFIG.pythonVenv(),(error,stdout,stderr) => {
                        if(error) throw error;
                        if(stderr) throw new Error(`Command Error : ${stderr}`);
                        else{ 
                            console.log("[PYTHON VENV ACTIVATED]");

                            this.getFilePaths()
                            .then((filePathArray) => {
                                const command = filePathArray;
                                command.push(input);

                                const pyProcess = spawnSync('python',filePathArray,{ encoding: 'utf-8' });

                                if(pyProcess.status === 0){
                                    const result = Number(pyProcess.stdout.substring(0,pyProcess.stdout.length-2));
                                    resolve(result);
                                }
                                else{
                                    console.log(`ERROR CODE : ${pyProcess.status}`);
                                    console.log(`PYTHON PROCESS ERROR : ${pyProcess.stderr}`);
                                    resolve(null);
                                }
                            })
                            .catch((error) => { throw error; });
                        }
                    });
                }
                catch(error){ reject(error); }
            });
        }

    }

}

// Exporting Spam Controller Instance
module.exports = new SpamController();

