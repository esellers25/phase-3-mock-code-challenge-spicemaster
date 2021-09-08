
let spiceBlendImage = document.querySelector("img.detail-image")
let spiceBlendTitle = document.querySelector("h2.title")
let spiceBlendIngList = document.querySelector("ul.ingredients-list")
let spiceTitleForm = document.querySelector("#update-form")


fetch("http://localhost:3000/spiceblends/1")
.then(res => res.json())
.then(function(spiceObj){
    addNewSpice(spiceObj)
})
        


function addNewSpice(spice){
    spiceBlendImage.src = spice.image
    spiceBlendTitle.innerText = spice.title
    let ingredientList = spice.ingredients
    spiceTitleForm.dataset.id = spice.id 
    ingredientList.forEach(function(ingredientObj){
        let singleIngredient = document.createElement("li")
        singleIngredient.innerText = ingredientObj.name
        spiceBlendIngList.append(singleIngredient)
    })  
}

spiceTitleForm.addEventListener("submit", function(evt){
    evt.preventDefault(); 
    let newSpiceTitle = evt.target.title.value; 
    let spiceId = evt.target.dataset.id; 
    fetch(`http://localhost:3000/spiceblends/${spiceId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json" 
        }, 
        body: JSON.stringify({
            title: newSpiceTitle
        })
    })
        .then(r => r.json())
        .then(function(newSpiceObj){
            spice = newSpiceObj
        })
    
})
