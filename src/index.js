import { taxRates } from "./res/taxRates.js";
import * as readline from 'readline'
console.log(taxRates);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let itemPrice = 0;
let itemQuantity = 0;

rl.question(`Quel est le prix de l'item ? `, price => {
    itemPrice = price;
    // if (typeof price === 'number') {
        
    // } else {
    //     console.log("La valeur choisie doit être un nombre")
    // }

    rl.question(`Quelle quantité souhaitez vous acheter ? `, quantity => {
        itemQuantity = quantity;
            console.log("Le total sera de : " + itemQuantity * itemPrice)
        // if (typeof(quantity) == 'number') {
        // } else {
        //     console.log("La valeur choisie doit être un nombre")
        // }
    })
})