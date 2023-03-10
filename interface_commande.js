let produits;
// if there is something already in the local storage
if (localStorage.getItem("prods")) {
    produits = JSON.parse(localStorage.getItem("prods"));
}
else {
    // first load (no data)
    produits = [];
}
console.log("at start => ", produits)
appendArray();

// when button clicked
go.addEventListener("click", function () {
    // init state (no pdt in store)
    if (produits.length == 0) {
        // make it a json
        newpdt = inputsToJson();
        // push to main array
        produits.push(newpdt);
        // display to verify
        console.log(produits);
        // store to localstorage
        localStorage.setItem("prods", JSON.stringify(produits));
    }
    // already prods in store, just check if new prod already exists 
    else {
        let counted = 0;


        // serving as a flag to know if end reached                 
        // loop through products                 
        for (i = 0; i < produits.length; i++) {
            console.log("\nstart the product loop ... ");
            console.log("current prod : ", produits[i]);
            // if name and ref already exists, add the stock                     
            if (
                produits[i]['name'] == document.getElementById("name").value
                &&
                produits[i]['reference'] == document.getElementById("reference").value
            ) {
                console.log("already in store !");
                produits[i]['quantity'] += parseInt(document.getElementById("quantity").value);
                localStorage.setItem("prods", JSON.stringify(produits));
            }
            // not existing, proceed as normal                     
            else {
                // not this one but maybe the next ?                       
                counted++;
            }
        } // end of for loop                 
        console.log(counted);
        // loop ended, check the "counted" flag (end reached without finding occurence of product)                
        if (counted === produits.length) {
            console.log("adding new product to list ...");
            newpdt = inputsToJson();
            produits.push(newpdt);
            // display to verify                    
            console.log(produits);
            // store to localstorage                    
            localStorage.setItem("prods", JSON.stringify(produits));
        } // end of if             
    } // end of else     
    appendArray()
}); // end of fct    

function inputsToJson() {
    // get all inputs             
    let nom = document.getElementById("name").value;
    let ref = document.getElementById("reference").value;
    let quantite = parseInt(document.getElementById("quantity").value);
    let prix = parseInt(document.getElementById("price").value);
    // return a pdt as json            
    return pdt_json = {
        "name": nom,
        "reference": ref,
        "quantity": quantite,
        "price": prix
    };
}

function appendArray() {
    let table = `<table> <thead> <th>Nom du produit</th> <th>R??f??rence</th> <th>Prix unitaire HT</th> <th>Stock disponible</th> </thead>`;
    let tbody = document.getElementById("tableau");
    for (let i = 0; i < produits.length; i++) {
        let nom = produits[i].name;
        let ref = produits[i].reference;
        let qte = produits[i].quantity;
        let prix = produits[i].price;
        table += `<tbody><tr><td>${nom}</td><td>${ref}</td><td>${prix}</td><td>${qte}</td></tr>`;
    }
    tbody.innerHTML = `${table}</tbody></table>`
}




