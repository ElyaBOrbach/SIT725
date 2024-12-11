let db = require('../models/pizza');

const getAllPizzas = (req,res) => {
    db.getAllPizzas((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
        else{
            res.json({statusCode:400,data:error,message:'failure'});
        }
    });
}

module.exports = {getAllPizzas}