'use strict';

// Node Modules
const path = require('path');

// Configuration Module
const CONFIG = {

    pythonVenv: function(){
        try{
            return `"${path.resolve(__dirname,'../py-env/Scripts/activate')}"`;
        }
        catch(error){ console.log(error); }
    },

}

// Configuration Module Export
module.exports = CONFIG;