//const express = require('express')  //require function used to search library
//const exampleController = require('./controllers/example-controller')

import express from 'express';
import HelloController from './controllers/hello-controller.js';
import TuitsController from './controllers/tuits/tuits-controller.js';
import UserController from "./controllers/users/users-controller.js";
import cors from 'cors'; //use to share data between different ports


const app = express() //create server

app.use(cors()) //use after server created
app.use(express.json())


HelloController(app)
UserController(app)
TuitsController(app)

app.listen(process.env.PORT || 4000) //listen on port 3000
