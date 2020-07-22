function populateUfs () {
    const ufSelect = document.querySelector("select[name=uf]")  

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
        return res.json()
    })
    .then((states) => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}<option/>`
        }
    })
}

populateUfs()

function GetCities(){
    const CitySelect = document.querySelector("select[name=city]")
    const StateSelect = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    StateSelect.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    CitySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    CitySelect.disabled = true

    fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((cities) => {
        for(const city of cities){
            CitySelect.innerHTML += `<option value="${city.nome}">${city.nome}<option/>`
        }

        CitySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", GetCities
)

const itemToCollect = document.querySelectorAll(".items-grid li")

for ( const item of itemToCollect ) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItem = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id    

    const alreadySelected = selectedItem.findIndex( item => {
        const intemFound = item == itemId
        return intemFound
    } )

    if(alreadySelected >= 0) {
        const filteredItems = selectedItem.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItem = filteredItems
    } else {
        selectedItem.push(itemId)        
    }

    collectedItems.value = selectedItem
    
}