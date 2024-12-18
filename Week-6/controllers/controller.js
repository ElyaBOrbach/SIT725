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
            res.json({statusCode:500,data:error,message:'failure'});
        }
    });
}

module.exports = {getAllPizzas, getPizza}