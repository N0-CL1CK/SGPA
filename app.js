// Importando módulos
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const dbService = require('./src/js/dbService');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/src/'));
app.use(bodyParser.urlencoded({ extended: true }));


//Abrindo a conexão do servidor
app.listen(process.env.PORT, () => {
    console.log(`[ONLINE] http://localhost:${process.env.PORT}/`)
});


//Instanciando as requisições do servidor
app.get('/', (_, res) => {
    res.render('pages/home');
});

app.get('/projetos', (_, res) => {
    res.render('pages/consultar_projetos');
});

app.route('/projetos/novo')
    .get((_, res) => {
        
        res.render('pages/add_projeto');

    })
    .post((req, res) => {
        const db = dbService.getDbServiceInstance();

        const result = db.getAllData();

        result
            .then(data => res.json({data : data}))
            .catch(err => console.log(err));
    });