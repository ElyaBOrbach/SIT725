var express = require("express")
var app = express()
var port = process.env.port || 3000;
let routes = require('./routes/routes');

app.use(express.static(__dirname + '/', { index: 'views/index.html' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/pizza',routes);

app.listen(port,()=>{
console.log("App listening to: "+port)
})