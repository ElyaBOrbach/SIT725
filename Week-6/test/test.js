var expect  = require("chai").expect;
var request = require("request");

describe('Get all pizzas', function() {

    it("returns a successful 200 response", function(done) {
        request("http://localhost:3000/api/pizza", function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns 3 values", function(done) {
        request("http://localhost:3000/api/pizza", function(error, response, body) {
            const data = JSON.parse(body)["data"];
            expect(data.length).to.equal(3);
            done();
        });
    });

});

describe('Get a pizza by name', function() {

    it("returns a successful 200 response if the name exists", function(done) {
        request("http://localhost:3000/api/pizza/Pepperoni", function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("and returns the result with the correct name", function(done) {
        request("http://localhost:3000/api/pizza/Pepperoni", function(error, response, body) {
            const data = JSON.parse(body)["data"];
            expect(data.name).to.equal("Pepperoni");
            done();
        });
    });

    it("returns error 404 if the name does not exist", function(done) {
        request("http://localhost:3000/api/pizza/Vegetable", function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

});