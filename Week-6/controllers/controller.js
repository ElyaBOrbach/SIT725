let db = require('../models/pizza');

const getAllPizzas = (req,res) => {
    db.getAllPizzas((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
        else{
            res.json({statusCode:500,data:error,message:'failure'});
        }
    });
}

const getPizza = (req,res) => {
    let name = req.params.name;

    db.getPizza(name, (error,result)=>{
        if (!error) {
            if(result != null) return res.json({statusCode:200,data:result,message:'success'});
            res.status(404).json({statusCode:404,data:result,message:'Not Found'});
        }
        else{
            res.status(500).json({statusCode:500,data:error,message:'failure'});
        }
    });
}

const postPizza = (req,res) => {
    let pizza = req.body;
    if(!pizza?.name) return res.status(400).json({statusCode:400,message:'Pizza not correctly given'});

    db.getPizza(pizza.name, (error,result)=>{
        if (!error) {
            if(result != null) return res.status(409).json({statusCode:409,message:'Pizza already exists'});
        }
        db.postPizza(pizza, (error,result)=>{
            if (!error) {
                return res.status(201).json({statusCode:201,data:result,message:'success'});
            }
            else{
                return res.status(500).json({statusCode:500,data:error,message:'failure'});
            }
        });
    });
}

const patchPizzaPrice = (req,res) => {
    let price = req.body.price;
    let name = req.params.name;
    if(!price || isNaN(price)) return res.status(400).json({statusCode:400,message:'Price not correctly given'});
    if(price <= 0) return res.status(400).json({statusCode:400,message:'Price not correctly given'});

    db.getPizza(name, (error,result)=>{
        if (!error) {
            if(result == null) return res.status(404).json({statusCode:404,message:'Pizza not found'});
        }
        db.patchPizzaPrice(name, price, (error,result)=>{
            if (!error) {
                return res.status(201).json({statusCode:201,data:result,message:'success'});
            }
            else{
                return res.status(500).json({statusCode:500,data:error,message:'failure'});
            }
        });
    });
}

async function deletePizza(req, res) {
    let name = req.params.name;

    db.getPizza(name, (error,result)=>{
        if (!error) {
            if(result == null) return res.status(404).json({statusCode:404,message:'Pizza not found'});
        }
        db.deletePizza(name,(error,result)=>{
            if (!error) {
                return res.status(204).json({statusCode:204});
            }
            else{
                return res.status(500).json({statusCode:500,data:error,message:'failure'});
            }
        });
    });
    
}

module.exports = {getAllPizzas, getPizza, postPizza, patchPizzaPrice, deletePizza}