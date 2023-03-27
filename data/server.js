require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const recipesRoutes = require('./routes/recipes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/recipes', recipesRoutes);

mongoose.connect(process.env.URI_MONGO)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to mongoDB & listening on http://localhost:', process.env.PORT);
        });
    })
    .catch(err => {
        console.log('err! URI_MONGO', err);
    });

app.get('/', (req, res) => {
    res.json({ mssg: "welcome to the api" });
});

