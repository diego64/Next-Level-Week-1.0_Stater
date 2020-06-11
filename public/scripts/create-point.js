function populateufs(){

    const ufselect = document.querySelector("select[name=uf]")
    
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()
        ).then ( states => {
        for(state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }     
        
    } )
}

function getCities(event){

    const cityselect = document.querySelector("select[name=city]")
    
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const index = event.target.selectedIndex
    stateInput.value = event.target.options[index].text

    cityselect.innerHTML = '<option value="">Selecione a Cidade</option>'
    cityselect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
        .then(res => res.json()
        ).then ( cities => {
            for(city of cities){
                cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        cityselect.disabled = false
    } )
}

populateufs();

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event){
    const itemLi = event.target 

    itemLi.classList.toggle("selected") 

    const itemId = itemLi.dataset.id
    
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    if( alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    
    //document.querySelector("input[name=items]")

    collectedItems.value = selectedItems 

    console.log(selectedItems)
    
}