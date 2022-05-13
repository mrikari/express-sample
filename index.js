'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const APP_VERSION = "latest";

const contextService = require('request-context');
const uuid = require('uuid');
const logger = require("./src/middlewares/logger").logger();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(contextService.middleware('request'));

/* index */
app.get('/', (req, res) => {
    res.json({ 'message': 'ok?' })
});
app.get('/api/hello', (req, res) => {
    res.json({ 'message': 'ok?' })
});


/* Reqest handler middleware */
app.use((req, res, next) => {
    const requestId = uuid.v4();
    contextService.set('request:requestId', requestId);
    logger.info(req.method, req.originalUrl, req.query);
    next();
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    const requestId = uuid.v4();
    contextService.set('request:requestId', requestId);
    const statusCode = err.statusCode || 500;
    logger.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

app.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}`);
});
