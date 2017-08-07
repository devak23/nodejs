"use strict";

let mongoose = require('mongoose');

// Define the Employee schema
let empSchema = mongoose.Schema({
    empno: {
        type: Number,
        required: true
    },
    ename: {
        type: String,
        required: true
    },
    job : {
        type: String,
        required: true
    },
    mgr: {
        type: Number,
        required: false
    },
    hiredate: {
        type: String,
        required: false
    },
    sal: {
        type: Number,
        required: true
    },
    comm: {
        type: Number,
        required: false
    },
    deptno: {
        type: Number,
        required: false
    }
});

empSchema.set("collection", "emp");

let Employee = module.exports = mongoose.model('Employee', empSchema);