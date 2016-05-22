"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = module.exports = express();

const http = require('http');
const debug = require('debug')('express-blog:server');
const port = 3000;


app.set('env', "development");
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.set('etag', true);

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static
app.use('/static', express.static(path.join(__dirname, './static'), {
    maxAge: 50000
}));

//custom router
const indexRoute = require('./routes/index');
//const socketRoute = require('./routes/socket');

app.use('/', indexRoute);
//app.use('/socket', socketRoute());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        if (err.status != 404) {
            console.error(err.message);
            console.error(err.stack);
            res.render('error', {
                title: "Error-dev",
                message: err.message,
                error: err
            });
        }
        next();
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Error',
        message: err.message,
        error: {}
    });
    next();
});

const server = http.createServer(app);

const socket = require("socket.io")(server);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

//socket

require('./routes/socket')(app,socket);


/**
 * Event listener
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log(`server is listen on port : ${port}`);
}

