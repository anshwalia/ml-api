'use strict';

// Node Modules
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

// Express App
const app = require('./app');

// Server Instance
const server = http.createServer(app);

// Server Listen
server.listen(process.env.PORT,() => {
    console.log(`[ SERVER STARTED @ PORT ${process.env.PORT} ]`);
});