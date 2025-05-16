const ufSelect = document.querySelector('select[name=state]');
const citySelect = document.querySelector('select[name=city]');
const collectionItems = document.querySelectorAll('.items-grid li');
const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

for (const item of collectionItems) {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const dataId = item.getAttribute('data-id');

        if (selectedItems.includes(dataId)) {
            selectedItems = selectedItems.filter(item => item !== dataId);
        } else {
            selectedItems.push(dataId);
        }

        collectedItems.value = selectedItems;
    })
}

populateUFs();
ufSelect.addEventListener("change", () => {
    const selectedOption = ufSelect.options[ufSelect.selectedIndex];
    const dataId = selectedOption.getAttribute('data-id');

    populateCities(dataId);
    if (dataId === '0') {
        citySelect.disabled = true;
    } else {
        citySelect.disabled = false;
    }
})

async function populateUFs() {
    try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('data-id', item.id);
            option.setAttribute('value', item.sigla);
            option.innerText = `${item.nome}`;

            ufSelect.appendChild(option); 
        });
    } catch {

    }
}

async function populateCities(id) {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
        const data = await response.json();
        
        citySelect.innerHTML = '<option value="0">Selecione a Cidade</option>';
        data.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('data-id', item.id);
            option.setAttribute('value', item.nome);
            option.innerText = `${item.nome}`;

            citySelect.appendChild(option);
        })
    } catch {

    }
}