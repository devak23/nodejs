"use strict";

const express = require('express');
const router = express.Router();
let Employee = require('../models/emp');


router.get('/', function (req, res, next) {
    Employee.find({}, function(err, employees) {
        // console.log("Employees: ", employees);
        
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.render('index', {
                title: 'Employees',
                employees: employees
            });
        }
    })
});

module.exports = router;