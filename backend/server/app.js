const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, './.env')});
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json())


app.use('/', routes)

module.exports = app;
