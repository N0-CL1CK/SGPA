const addBtn = document.querySelector("button#btn-cadastrar-projeto.btn.btn-outline-success");

addBtn.onclick = function () {

    const titulo = document.querySelector("#tituloDoProjeto").value;
    const duracao = document.querySelector("#duracao").value;
    const val_taxa = document.querySelector("#valTaxa").value;
    const num_edital = document.querySelector("#numEdital").value;
    const area_conhecimento = document.querySelector("#areaConhecimento").value;
    const status = document.querySelector("#status").value;

    const nomeCoord = document.querySelector("#nomeCoordenador").value;
    const regFuncCoord = document.querySelector("#numRegCoordenador").value;
    const cargoCoord = document.querySelector("#cargoCoordenador").value;

    const nomeServ = document.querySelector("#nomeServidor").value;
    const regFuncServ = document.querySelector("#numRegServidor").value;
    const cargoServ = document.querySelector("#cargoServidor").value;

    const nomeDiscColab = document.querySelector("#nomeDiscColabodarador").value;
    const regAcadDiscColab = document.querySelector("#numRegDiscColab").value;
    const cursoDiscColab = document.querySelector("#cursoDiscColab").value;

    const nomeDiscBols = document.querySelector("#nomeDiscBolsista").value;
    const regAcadDiscBols = document.querySelector("#numRegDiscBols").value;
    const cursoDiscBols = document.querySelector("#cursoDiscBols").value;

    function validar() {
        const campos = document.querySelectorAll("main [required]");
        var campsValidos = [];

        for (campo of campos) {
            if (campo.value.length == 0) {
                campsValidos.push(false);
            } else {
                campsValidos.push(true);
            }
        }

        if (campsValidos.indexOf(false) == -1) {
            return true;
        } else {
            return false;
        }
    }
    
    valido = validar();

    if (!valido) {
        alert("Preencha todos os campos corretamente!");

    } else {
        fetch('http://localhost:8080/projetos/novo', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                titulo: titulo,
                duracao: duracao,
                val_taxa: val_taxa,
                num_edital: num_edital,
                area_conhecimento: area_conhecimento,
                stts: status,
                nomeCoord: nomeCoord, 
                regFuncCoord: regFuncCoord,
                cargoCoord: cargoCoord, 
                nomeServ: nomeServ,
                regFuncServ: regFuncServ,
                cargoServ: cargoServ,
                nomeDiscColab: nomeDiscColab,
                regAcadDiscColab: regAcadDiscColab,
                cursoDiscColab: cursoDiscColab,
                nomeDiscBols: nomeDiscBols,
                regAcadDiscBols: regAcadDiscBols,
                cursoDiscBols: cursoDiscBols
            })
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }
}