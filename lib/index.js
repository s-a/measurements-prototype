#!/usr/bin/env node

"use strict"

var fs = require('fs')
var path = require('path')
var express = require('express')

var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.use(express.static('public'))
app.use('/socket.io/', express.static('node_modules/socket.io-client/dist'))

io.on('connection', function () {
    console.log('client connected')
})
server.listen(9000)



var getMeasurementData = function () {
    return [
        [Math.random()],
        [Math.random()]
    ]
}

var cnt = 0
var start = function () {
    var interval = setInterval(function () {
        io.emit('measurement', getMeasurementData());
    }, 50);
}

start();

console.log('listening to port 9000')