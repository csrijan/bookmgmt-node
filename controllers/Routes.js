var express = require('express');
var router = express.Router();
var url = require("url");

module.exports.controller = function (app) {
    //Handle index page
    app.disable('etag');

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/error1', function (req, res) {
        console.log("Inside log handler");
         res.render('error');
    });

   //Handle all request. Ex: "\Routes?pg=landingPage"
    app.get('/Routes', function (req, res) {
        console.log("Handling request from routes Gateway");
        var data = url.parse(req.url, true).query;
        console.log(data.pg);
        res.render(data.pg);
    });

};