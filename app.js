// Importando módulos
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();


var port = process.env.PORT || 8080;


// Arquivos estáticos
//app.use(express.static('public'))
//app.use('/css', express.static(__dirname, 'public/css'))


// Set Engine Template
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/src/'))


//Abrindo a conexão do servidor
app.listen(port, () => console.log(`[ONLINE] http://localhost:${port}/`));


//Instanciando as requisições do servidor
app.get('/', (_, res) => {
    res.render('pages/home');
});