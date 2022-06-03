const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = process.env.PORT||8000;


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    res.send("Email transfer successful!");
});

app.listen(port, () => {
    console.log("server listening on port " + port);
});