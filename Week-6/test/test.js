var expect  = require("chai").expect;
const sinon = require('sinon');
var request = require("request");
const server = require('../server');

describe('Pizza Routes', () => {
    before(() => {
        let mock = sinon.stub(require('../models/connection'), 'db').returns({
            collection: sinon.stub().returns({
                find: sinon.stub().returns({
                    toArray: sinon.stub().resolves([{ name: 'Margherita' }, { name: 'Pepperoni' }]),
                }),
                findOne: sinon.stub((name) =>
                    [{ name: 'Margherita' }, { name: 'Pepperoni' }].find((pizza) => pizza.name === name.name) ?? null
                ),
                insertOne: sinon.stub().resolves({ acknowledged: true }),
                updateOne: sinon.stub().resolves({ acknowledged: true }),
                deleteOne: sinon.stub().resolves({ acknowledged: true }),
            }),
        });

    });

    describe('Get all pizzas', function() {
        it("returns a successful 200 response", function(done) {
            request.get("http://localhost:3000/api/pizza", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns 3 values", function(done) {
            request.get("http://localhost:3000/api/pizza", function(error, response, body) {
                const data = JSON.parse(body)["data"];
                expect(data.length).to.equal(2);
                done();
            });
        });

    });

    describe('Get a pizza by name', function() {

        it("returns a successful 200 response if the name exists", function(done) {
            request.get("http://localhost:3000/api/pizza/Pepperoni", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("and returns the result with the correct name", function(done) {
            request.get("http://localhost:3000/api/pizza/Pepperoni", function(error, response, body) {
                const data = JSON.parse(body)["data"];
                expect(data.name).to.equal("Pepperoni");
                done();
            });
        });

        it("returns error 404 if the name does not exist", function(done) {
            request.get("http://localhost:3000/api/pizza/Vegetable", function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

    });

    describe('Create a pizza', function() {
        it("returns error 400 if the pizza data is not given", function(done) {
            const pizza = {};
            request.post({
                url: "http://localhost:3000/api/pizza",
                body: pizza,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });
        it("returns error 409 if the pizza by that name already exists", function(done) {
            const pizza = { name: 'Margherita', ingredients: ['tomato', 'cheese'], price: 12.99 };
            request.post({
                url: "http://localhost:3000/api/pizza",
                body: pizza,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(409);
                done();
            });
        });
        it("returns 201 if the pizza is added successfully", function(done) {
            const pizza = { name: 'Veggie Supreme', ingredients: ['tomato', 'cheese'], price: 12.99 };
            request.post({
                url: "http://localhost:3000/api/pizza",
                body: pizza,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(201);
                done();
            });
        });
    });

    describe('Update the price of a pizza', function() {
        it("returns error 400 if no price is given", function(done) {
            const price = {};
            request.patch({
                url: "http://localhost:3000/api/pizza/price/Pepperoni",
                body: price,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });
        it("returns error 400 if price is negative", function(done) {
            const price = {price: -10};
            request.patch({
                url: "http://localhost:3000/api/pizza/price/Pepperoni",
                body: price,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });
        it("returns error 400 if price is not a number", function(done) {
            const price = {price: "abc"};
            request.patch({
                url: "http://localhost:3000/api/pizza/price/Pepperoni",
                body: price,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });
        it("returns error 404 if the pizza does not exist", function(done) {
            const price = {price: 10};
            request.patch({
                url: "http://localhost:3000/api/pizza/price/FakePizza",
                body: price,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it("returns 201 if the pizza price is updated", function(done) {
            const price = {price: 10};
            request.patch({
                url: "http://localhost:3000/api/pizza/price/Pepperoni",
                body: price,
                json: true,
            },
            function(error, response, body) {
                expect(response.statusCode).to.equal(201);
                done();
            });
        });
    });

    describe('Delete a pizza', function() {
        it("returns error 404 if the pizza does not exist", function(done) {
            request.delete("http://localhost:3000/api/pizza/FakePizza", function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it("returns 204 if the pizza is deleted", function(done) {
            request.delete("http://localhost:3000/api/pizza/Pepperoni", function(error, response, body) {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });
});