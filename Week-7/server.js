var express = require("express")
var app = express()
var port = process.env.port || 3000;
let routes = require('./routes/routes');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/', { index: 'views/index.html' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/pizza',routes);

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        let x=parseInt(Math.random()*5);
        let pizza = ['Margherita', 'Pepperoni', 'Veggie Supreme', 'Village', 'Country']
        socket.emit('pizza', pizza[x]);
        console.log('Emmiting Discounted Pizza '+pizza[x]);
    }, 1000)
});

http.listen(port,()=>{
console.log("App listening to: "+port)
})