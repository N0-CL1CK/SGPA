const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data text-center' colspan='3'>Nenhum projeto cadastrado</td></tr>";
    }
}

window.onload = () => {
    loadHTMLTable([]);
    /* BOTÃO DE PESQUISAR POR FILTRO
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
    */
}