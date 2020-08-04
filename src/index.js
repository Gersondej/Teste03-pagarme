require('dotenv').config()
const express = require('express');
var hbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

console.log( path.join(__dirname, 'app/views'))
app.use(cors({origin: 'http://localhost:8000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use('/imagens',express.static('imagens'));

app.get('/', (req,res) => {
    res.send('OK');
});


require('./app/controllers/index')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App está escutando na porta 3000');
});