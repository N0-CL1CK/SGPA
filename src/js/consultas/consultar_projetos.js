const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody');

    console.log(data);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data text-center' colspan='3'>Nenhum projeto cadastrado</td></tr>";
        return;
    }

    let tableHtml = "";

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

window.onload = () => {
    
}