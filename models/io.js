'use strict';

// Node Modules
const fs = require('fs');
const path = require('path');

// Input/Output Module
const IO = {

    // Method To Initialize IO Module
    init: function(){
        console.log("[ IO Module Initialized ]");
    },

    // Method To Read File
    readFile: function(filePath){
        return new Promise((resolve,reject) => {
            try{
                if(fs.existsSync(filePath)){
                    const data = (fs.readFileSync(filePath)).toString('utf-8');
                    resolve(data);
                }
                else{
                    throw new Error(`${filePath} : Does Not Exists!`);
                }
            }
            catch(error){ reject(error); }
        });
    }

}

module.exports = IO;