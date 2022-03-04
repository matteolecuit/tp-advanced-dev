import { taxRates } from "./res/taxRates.js";
import * as readline from 'readline'
console.log(taxRates);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let itemPrice = 0;
let itemQuantity = 0;
let discount = 0;
let totalPrice = 0;

rl.question(`Quel est le prix de l'item ? `, price => {
    itemPrice = price;

    rl.question(`Quelle quantité souhaitez vous acheter ? `, quantity => {
        itemQuantity = quantity;
        totalPrice = itemQuantity * itemPrice
        console.log(`Le total HT sera de : ${totalPrice}`);

        if (totalPrice > 1000) {
            discount = 3;
        }
        console.log(`La réduction actuelle est de ${discount} %`);

        rl.question(`Quelle est la valeur de la réduction à appliquer ? `, discount => {
            discount = discount;
        
            console.log(`Le taux de réduction est de ${discount} %`);
            let ttcPrice = totalPrice * (1 - (discount / 100));
            console.log(`Le prix TTC est de ${ttcPrice}`);
            rl.close()
        })
    })
})



