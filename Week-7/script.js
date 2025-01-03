function showPizzas(pizzas) {
    const tableBody = $('#table tbody');

    pizzas.forEach(pizza => {
        const row = $('<tr></tr>');
        row.append(`<td>${pizza.name}</td>`);
        row.append(`<td>$${pizza.price}</td>`);
        
        tableBody.append(row);
    });
}

function getAllPizzas() {
    $.get('/api/pizza', (result) => {
        if (result.statusCode === 200) {
            showPizzas(result.data);
        }
    });
}

$(document).ready(function(){
    getAllPizzas();
});

let socket = io();
socket.on('pizza',(msg)=>{
    console.log('Discounted Pizza: ' + msg);
    const socketout = $('#socketOut');
    socketout.html(msg);
});