const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');
const config = require('./config.json');
const { send } = require('process');
const port = process.env.PORT||8000;

const apikey = config.APIKEY;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    
    const options = {
        method: 'GET',
        url: 'https://global-email-v4.p.rapidapi.com/v4/WEB/GlobalEmail/doGlobalEmail',
        params: {
          email: email,
          opt: 'VerifyMailbox:Express|VerifyMailbox:ExpressPremium',
          format: 'json'
        },
        headers: {
          'X-RapidAPI-Host': 'global-email-v4.p.rapidapi.com',
          'X-RapidAPI-Key': apikey
        }
      };
      
      axios.request(options).then(function (response) {
          const score = Number(response.data.Records[0].DeliverabilityConfidenceScore);
          const valid = score > 0 ? true: false; 
          console.log(valid);
          res.send('<h1>Message Sent!</h1>');

      }).catch(function (error) {
          console.error(error);
      });
});

app.listen(port, () => {
    console.log("server listening on port " + port);
});