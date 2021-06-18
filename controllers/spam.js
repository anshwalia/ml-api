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

        // Spam - POST
        this.POST = (req,res) => {
            try{
                const { text } = req.body;
                if(typeof(text) === 'string'){
                    this.checkSpam(text).then((result) => {
                        if(result === 1){ res.status(200).json({ success: true, spam: true }); }
                        else{ res.status(200).json({ success: true, spam: false }); }
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

        // Method for running python script to classify spam
        this.checkSpam = (input) => {
            return new Promise((resolve,reject) => {
                try{
                    // Activating Python Virtual Environment
                    exec(process.env.PYENV,(error,stdout,stderr) => {
                        if(error) throw error;
                        if(stderr) throw new Error(`Command Error : ${stderr}`);
                        else{
                            // Python Script Path
                            const pyScript = path.resolve(__dirname,'../py-scripts/spam.py');
                            // Model Input Scaler Path
                            const pyVectorizer = path.resolve(__dirname,'../py-models/spam/vectorizer');
                            // Machine Learning Model Path
                            const pyModel = path.resolve(__dirname,'../py-models/spam/model');
                            // Python Model Script - Child Process
                            const pyProcess = spawn('python',[pyScript,pyVectorizer,pyModel,JSON.stringify(input)]);
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

// Exporting Spam Controller Instance
module.exports = new SpamController();

