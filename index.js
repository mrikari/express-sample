'use strict';

const express = require('express');
const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const contextService = require('request-context');
const uuid = require('uuid');
const logger = require("./src/middlewares/logger").logger();

const User = require('./src/models').User

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(contextService.middleware('request'));

/* index */
app.get('/', async (req, res) => {
    res.json({ 'message': 'ok' })
});

app.get('/api/hello', (req, res) => {
    const [user, created] = await User.findOrCreate({
        where: { id: 1 },
        defaults: {
            unique: '11111111111311',
            class_id: 1,
            name: '11111111111311',
            followers: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
    console.log(user, created)
    var test = await User.findAll()
    console.log(test)

    res.json(test)
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
    // const requestId = uuid.v4();
    // contextService.set('request:requestId', requestId);
    // const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

app.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}`);
});
