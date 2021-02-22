const mysql = require('mysql2');
const dotenv = require('dotenv');

let instance = null;

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: '',
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) console.log(err.message);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async insertNewProject(titulo, duracao, val_taxa, num_edital, area_conhecimento, stts) {
        try {
            const insertProject = await new Promise((resolve, reject) => {
                const query = "INSERT INTO projeto (titulo, duracao, num_edital, val_tax_bancada, area_conhecimento, stts) VALUES (?, ?, ?, ?, ?, ?);";

                connection.query(query, [titulo, duracao, val_taxa, num_edital, area_conhecimento, stts], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });

            return insertProject;

        } catch (err) {
            console.error(err);
        }
    }

    async insertNewDiscente(nome, regAcademico, curso, tipo) {
        try {
            if (tipo == 1) var t = "colaborador";
            else if (tipo == 2) var t = "bolsista";

            const insertDiscente = await new Promise((resolve, reject) => {
                const query = `INSERT INTO discente_${t} (nome, reg_academico, curso) VALUES (?, ?, ?);`;

                connection.query(query, [nome, regAcademico, curso], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result)
                });
            });

            return insertDiscente;

        } catch (err) {
            console.error(err);
        }
    }

    async insertNewFuncionario(nome, regFuncional, cargo, tipo) {
        try {
            if (tipo == 1) var t = "coordenador_projeto";
            else if (tipo == 2) var t = "servidor_colaborador";

            const insertFuncionario = await new Promise((resolve, reject) => {
                const query = `INSERT INTO ${t} (nome, reg_funcional, cargo) VALUES (?, ?, ?);`;

                connection.query(query, [nome, regFuncional, cargo], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result)
                });
            });

            return insertFuncionario;

        } catch (err) {
            console.error(err);
        }
    }

    async insertNewProjetoUser(idProjeto, idUser, tipo) {
        try {
            if (tipo == 1) var t = "coordenador_projeto";
            else if (tipo == 2) var t = "servidor_colaborador";
            else if (tipo == 3) var t = "discente_colaborador";
            else if (tipo == 4) var t = "discente_bolsista";

            const insertProjetoUser = await new Promise((resolve, reject) => {
                const query = `INSERT INTO projetouser (id_projeto, id_${t}) VALUES (?, ?);`;
            
                connection.query(query, [idProjeto, idUser], (err, result) => {
                    if (err) reject (new Error(err.message));
                    resolve(result);
                });
            });

            return insertProjetoUser;

        } catch (err) {
            console.error(err);
        }
    }

    async getAllData() {
        try {
            const response = await new Promise((res, rej) => {
                const query = "SELECT DISTINCT p.stts, p.titulo, cp.nome FROM projeto p LEFT JOIN coordenador_projeto cp ON p.id = cp.id;";

                connection.query(query, (err, results) => {
                    if (err) rej(new Error(err.message));

                    res(results);
                });
            });
            
            return response;

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DbService;