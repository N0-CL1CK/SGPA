const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data text-center' colspan='3'>Nenhum projeto cadastrado</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach (function ({stts, titulo, nome}) {
        if (stts == 1) stts = "Finalizado";
        else if (stts == 2) stts = "Em andamento";
        else if (stts == 3) stts = "Não concluído";
        
        tableHtml += "<tr>";
        tableHtml += `<td>${stts}</td>`;
        tableHtml += `<td>${titulo}</td>`;
        tableHtml += `<td>${nome}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

}

const filter_date = () => {
    document.querySelector('#btn-submit').onclick = () => {
        const datas = []

        datas.push(document.getElementById('date-inicial').value);
        datas.push(document.getElementById('date-final').value);

        const dias = [];
        const meses = [];
        const anos = [];

        for (data of datas) {
            dias.push(data.substring(0, 2));
            meses.push(data.substring(3, 5));
            anos.push(data.substring(6));
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/projetos/getAll')
    .then(response => response.json())
    .then(data => {
        loadHTMLTable(data['data']);
    })
    .catch((err) => console.error(err));
});