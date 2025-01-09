let controller = require('../controllers/controller');
let express = require('express');
let routes = express.Router();

routes.patch('/price/:name', (req,res)=>{
    controller.patchPizzaPrice(req,res);
})

routes.get('/', (req,res)=>{
    controller.getAllPizzas(req,res);
});

routes.get('/:name', (req,res)=>{
    controller.getPizza(req,res);
});

routes.post('/', (req,res)=>{
    controller.postPizza(req,res);
});

routes.delete('/:name', (req,res)=>{
    controller.deletePizza(req,res);
});

module.exports = routes;