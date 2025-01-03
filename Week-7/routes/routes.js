let controller = require('../controllers/controller');
let express = require('express');
let routes = express.Router();

routes.get('/', (req,res)=>{
    controller.getAllPizzas(req,res);
});

routes.get('/:name', (req,res)=>{
    controller.getPizza(req,res);
});

module.exports = routes;