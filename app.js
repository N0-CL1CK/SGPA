// Importando módulos
import { express } from require('express');

//Importando arquivos locais
var config = require('./src/configs.json');

//Instanciando a conexão
var app = express();


//Instanciando as requisições do servidor
app.get('/', (_, res) => {
    res.send('hello world');
});


//Abrindo a conexão do servidor
app.listen(config.PORT, () => {
    console.log(`[ONLINE] http://localhost:${config.PORT}`);
});