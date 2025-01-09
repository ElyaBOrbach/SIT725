let client = require('./connection');

function getCollection() {
    return client.db('myDB').collection("pizzaMenu");
}

async function getAllPizzas(callback) {
    const collection = getCollection();
    const data = await collection.find({}).toArray();
    callback(null, data);
}

async function getPizza(name, callback) {
    const collection = getCollection();
    const data = await collection.findOne({ name: name });
    callback(null, data);
}

async function postPizza(pizza, callback) {
    const collection = getCollection();
    const result = await collection.insertOne(pizza);
    callback(null, result);
}

async function patchPizzaPrice(name, price, callback) {
    const collection = getCollection();
    result = await collection.updateOne(
        { name: name },
        { $set: { 'price': price } }
      );
    callback(null, result);
}

async function deletePizza(name, callback){
    const collection = getCollection();
    result = await collection.deleteOne({name: name});
    callback(null, result);
  }

module.exports = { getAllPizzas, getPizza, postPizza, patchPizzaPrice, deletePizza};