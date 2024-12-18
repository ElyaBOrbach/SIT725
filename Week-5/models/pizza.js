const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://dbuser:IpadTf8R4RXpS4YZ@sit725.yzrfd.mongodb.net/?retryWrites=true&w=majority&appName=sit725";

async function getAllPizzas(callback) {
    const client = new MongoClient(uri);
 
    try {
        await client.connect();
        const db = client.db("myDB");
        const collection = db.collection("pizzaMenu");
 
        const data = await collection.find({}).toArray();
 
        console.log(data);

        callback(null, data);
    } catch (err) {
        console.error('Error fetching data:', err);
        callback(err, null);
    } finally {
        await client.close();
    }
}

module.exports = {getAllPizzas}