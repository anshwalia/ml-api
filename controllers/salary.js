'use strict';

// MODULE - SALARY CONTROLLER

// Required Modules
const dotenv = require('dotenv'); dotenv.config();
const { spawn, exec } = require('child_process');
const path = require('path');

// Salary Controller Class
class SalaryController{

    constructor(){
        // ROUTE METHODS

        // SALARY GET
        this.GET = (req,res) => {
            try{
                res.status(200).json({ 
                    success: true,
                    route: '/salary',
                    request: 'GET', 
                    description: 'Salary Prediction Using Linear Regression'
                });
            }
            catch(error){
                res.status(500).json({ success: false, message: 'Server Error!' });
                console.error(error);
            }
        }

        // SALARY POST
        this.POST = (req,res) => {
            try{
                const { experience } = req.body;
                if((typeof(experience) === 'string')&&(/^[0-9.]+$/.test(experience))){
                    // Converting Experience String To Number
                    experience = Number(experience);
                    // Predicting Salary With Experience
                    this.predictSalary(experience).then((salary) => {
                        if(salary === null) throw new Error('NULL OUTPUT');
                        else{ res.status(200).json({ success: true, salary: salary }); }
                    }).catch((error) => { throw error; });
                }
                else{ res.status(308).json({ success: false, message: 'Invalid Input!' }); }
            }
            catch(error){
                res.status(500).json({ success: false, message: 'Server Error!' });
                console.error(error);
            }
        }

        // Method to predict salary using experience
        this.predictSalary = (experience) => {
            return new Promise((resolve,reject) => {
                try{
                    // Activating Python Virtual Environment
                    exec(process.env.PYENV,(error,stdout,stderr) => {
                        if(error) throw error;
                        if(stderr) throw new Error(`Command Error : ${stderr}`);
                        else{
                            // Python Script Path
                            const pyScript = path.resolve(__dirname,'../py-scripts/salary.py');
                            // Machine Learning Model Path
                            const pyModel = path.resolve(__dirname,'../py-models/salary');
                            // Python Model Script - Child Process
                            const pyProcess = spawn('python',[pyScript,pyModel,experience]);
                            // Standard Output
                            pyProcess.stdout.on('data',(salary) => {
                                salary = Number(salary.toString('utf-8'));
                                resolve(salary);
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
                catch(err){ resolve(null); console.error(err); }
            });
        }
    }
}

// Exporting Salary Controller Instance
module.exports = new SalaryController();