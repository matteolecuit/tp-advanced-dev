import { taxRates } from "./res/taxRates.js";
import { discountRates } from "./res/discountRates.js";
import * as readline from 'readline'
console.log(taxRates);
console.log(discountRates);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let itemPrice = 0;
let itemQuantity = 0;
let discount = 0;
let totalPrice = 0;
let taxRate = 0;

rl.question(`Quel est le prix de l'item ? `, price => {
    itemPrice = price;

    rl.question(`Quelle quantité souhaitez vous acheter ? `, quantity => {
        itemQuantity = quantity;
        totalPrice = itemQuantity * itemPrice
        console.log(`Le total HT sera de : ${totalPrice}`);

        rl.question(`Quel est votre code d'état ? `, stateCode => {
            let foundTaxRate = taxRates.find(element => element.code == stateCode).rate;

            if (foundTaxRate) {
                taxRate = foundTaxRate;
                console.log(`La TVA est de ${foundTaxRate} %`);
            } else {
                console.log(`Aucune code correspondant, le taux par défaut est de 20 %`);
            }
            
            console.log(`Le taux de réduction est de ${discount} %`);
            let ttcPrice = totalPrice * (1 - (discount / 100));
            console.log(`Le prix TTC est de ${ttcPrice}`);

            if (totalPrice > 1000) {
                discount = 3;
            } else if (totalPrice > 5000) {
                discount = 5;
            } else if (totalPrice > 7000) {
                discount = 7;
            } else if (totalPrice > 10000) {
                discount = 10;
            } else if (totalPrice > 16000) {
                discount = 15
            }
            console.log(`La réduction actuelle est de ${discount} %`);
    
            if (totalPrice <= 16000) {
                rl.question(`Quelle est la valeur de la réduction à appliquer ? `, discount => {
                    discount = discount;
                
                    console.log(`Le taux de réduction est de ${discount} %`);
                    let ttcPrice = totalPrice * (1 - (discount / 100));
                    console.log(`Le prix TTC est de ${ttcPrice}`);
                    rl.close()
                })
                rl.close()
            }
        })
    })
})



