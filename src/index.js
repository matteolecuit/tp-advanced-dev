import { taxRates } from "./res/taxRates.js";
import * as util from "util";
import * as readline from "readline";
import { discountRates } from "./res/discountRates.js";
console.log(taxRates);
console.log(discountRates);

const items = [];

const getNewItem = async () => {
  let itemPrice = 0;
  let itemQuantity = 0;
  let totalPrice = 0;
  let discount = 0;
  let taxRate = 0;
  let ttcPrice = 0;
  let itemLabel = "";

  let continueLoop = false;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const prompt = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  await (async () => {
    try {
      itemLabel = String(await prompt("Label: "));
      itemPrice = Number(await prompt("Price: "));
      itemQuantity = Number(await prompt(`Quantity: `));
      const stateCode = String(await prompt("Code: "));
      let foundTaxRate = taxRates.find(
        (element) => element.code == stateCode
      ).rate;

      if (foundTaxRate) {
        taxRate = foundTaxRate;
        // console.log(`La TVA est de ${foundTaxRate} %`);
      } else {
        console.log(
          `Aucune code correspondant, le taux par défaut est de 20 %`
        );
      }

      totalPrice = itemPrice * itemQuantity;
      ttcPrice = totalPrice * (1 - discount / 100);
      //can prompt multiple times.
      if (totalPrice > 1000) {
        discount = 3;
      } else if (totalPrice > 5000) {
        discount = 5;
      } else if (totalPrice > 7000) {
        discount = 7;
      } else if (totalPrice > 10000) {
        discount = 10;
      } else if (totalPrice > 16000) {
        discount = 15;
      }
      console.log(`La réduction actuelle est de ${discount} %`);

      if (totalPrice <= 16000) {
        const newDiscount = Number(await prompt("discount (-1 for default): "));
        if (newDiscount !== -1) discount = newDiscount;
      }
      ttcPrice = totalPrice * (1 - discount / 100);
      items.push({
        itemPrice,
        itemQuantity,
        totalPrice,
        ttcPrice,
        taxRate,
        itemLabel,
      });
      const resContinue = await prompt(`continue`);
      if (String(resContinue).toLowerCase() == "y") continueLoop = true;
      rl.close();
    } catch (e) {
      console.error("unable to prompt", e);
    }
  })();
  return continueLoop;
};

const main = async () => {
  while (true) {
    const continueLoop = await getNewItem();
    if (!continueLoop) break;
  }

  console.log(items);
  const total = items.map((item) => {
    return item["totalPrice"];
  });
  console.log("total TTC: " + total);
};

main().catch();