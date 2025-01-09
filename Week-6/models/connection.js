const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://s222252774:ybUYj57ufhpDe45n@sit725.yzrfd.mongodb.net/?retryWrites=true&w=majority&appName=sit725";

const client = new MongoClient(uri);
 
client.connect();

module.exports = client;