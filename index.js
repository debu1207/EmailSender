const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const config = require('./config.json');
const port = process.env.PORT||8000;

const apikey = config.APIKEY;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {

    const {name, email, message} = req.body;
    console.log(email);
    res.send('Email send successfully.')
});

app.listen(port, () => {
    console.log("server listening on port " + port);
});