'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const server = express();
const router = require('./routes/router');
const routerQ = require('./routes/options.js');
const routerOp = require('./routes/questions.js');
const notFound = require('./middleware/404');
const errorHandle = require('./middleware/500');
const sturdentsRoutes = require('./routes/students')

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use('/', sturdentsRoutes)
server.use('/', router);
server.use('/', routerQ);
server.use('/', routerOp);
server.get('/errorRoute', (req, res) => {
    throw new Error('this route is 500 status')
})
server.use('*', notFound);
server.use(errorHandle);

module.exports = {
    server: server,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`listening on ${PORT}`));
    }
};