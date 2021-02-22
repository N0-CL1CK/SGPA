// Importando módulos
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const dbService = require('./src/js/dbService');
const dotenv = require('dotenv');
const { response } = require('express');
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

app.get('/projetos/getAll', (_, res) => {
    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    
    result
    .then(data => {
        res.json({data: data});
    })
    .catch(err => console.log(err));
});

app.get('/usuarios', (_, res) => {
    res.render('pages/consultas/consultar_usuarios');
});

app.get('/projetos', (_, res) => {
    res.render('pages/consultas/consultar_projetos');
});

app.route('/projetos/novo')
    .get((_, res) => {
        res.render('pages/cadastros/cadastrar_projetos');

    })
    .post((req, res) => {
        const {titulo, duracao, val_taxa, num_edital, area_conhecimento, stts} = req.body,
              {nomeCoord, regFuncCoord, cargoCoord} = req.body,
              {nomeServ, regFuncServ, cargoServ} = req.body,
              {nomeDiscColab, regAcadDiscColab, cursoDiscColab} = req.body,
              {nomeDiscBols, regAcadDiscBols, cursoDiscBols} = req.body;

        const db  = dbService.getDbServiceInstance();
        const result_projetos = db.insertNewProject(titulo, duracao, val_taxa, num_edital, area_conhecimento, stts);
        const result_coord = db.insertNewFuncionario(nomeCoord, regFuncCoord, cargoCoord, 1); //tipo 1 = coordenador | tipo 2 = servidor colaborador
        const result_serv_colab = db.insertNewFuncionario(nomeServ, regFuncServ, cargoServ, 2); //tipo 1 = coordenador | tipo 2 = servidor colaborador
        const result_disc_colab = db.insertNewDiscente(nomeDiscColab, regAcadDiscColab, cursoDiscColab, 1); //tipo 1 = colaborador | tipo 2 = bolsista
        const result_disc_bols = db.insertNewDiscente(nomeDiscBols, regAcadDiscBols, cursoDiscBols, 2); //tipo 1 = colaborador | tipo 2 = bolsista

        result_projetos
        .then(dados_projeto => {
            result_coord
            .then(dados_coord => {
                const result_projUserCoord = db.insertNewProjetoUser(dados_projeto.insertId, dados_coord.insertId, 1); //tipo 1 = coordenador | tipo 2 = servidor colaborador | tipo 3 = discente colaborador | tipo 4 = discente bolsista
                result_serv_colab
                .then(dados_servidor_colaborador => {
                    const result_projUserServ = db.insertNewProjetoUser(dados_projeto.insertId, dados_servidor_colaborador.insertId, 2); //tipo 1 = coordenador | tipo 2 = servidor colaborador | tipo 3 = discente colaborador | tipo 4 = discente bolsista
                    result_disc_colab
                    .then(dados_discente_colaborador => {
                        const result_projUserColab = db.insertNewProjetoUser(dados_projeto.insertId, dados_discente_colaborador.insertId, 3); //tipo 1 = coordenador | tipo 2 = servidor colaborador | tipo 3 = discente colaborador | tipo 4 = discente bolsista
                        result_disc_bols
                        .then(dados_discente_bolsista => {
                            const result_projUserBols = db.insertNewProjetoUser(dados_projeto.insertId, dados_discente_bolsista.insertId, 4); //tipo 1 = coordenador | tipo 2 = servidor colaborador | tipo 3 = discente colaborador | tipo 4 = discente bolsista
                        })
                        .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    });