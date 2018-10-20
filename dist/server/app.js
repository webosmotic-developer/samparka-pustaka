"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var http = require("http");
var sio = require("socket.io");
var app = express();
exports.app = app;
var httpServer = http.createServer(app);
var io = sio.listen(httpServer, {
    // below are engine.IO options
    pingInterval: 1000,
    pingTimeout: 5000,
});
app.set('ip', (process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'));
app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000));
app.set('views', path.join(__dirname, '/assets/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
httpServer.listen(app.get('port'), app.get('ip'), function () {
    var msgStr = 'Angular Full Stack listening on port ' + app.get('port');
    console.log(msgStr);
});
/*----- START: Node Process events for get exceptions -----*/
process
    .on('unhandledRejection', function (reason, p) {
    console.error(reason, 'UNHANDLED REJECTION AT PROMISE', p);
})
    .on('rejectionHandled', function (p) {
    console.error('REJECTION UNHANDLED', p);
})
    .on('uncaughtException', function (err) {
    console.error('UNCAUGHT EXCEPTION : ', err);
})
    .on('warning', function (warning) {
    console.error('WARNING : ', warning);
});
//# sourceMappingURL=app.js.map