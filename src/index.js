import { taxRates } from "./res/taxRates.js";
import * as readline from "readline";
import * as util from "util";
console.log(taxRates);

const items = [];

const getNewItem = async () => {
  let itemPrice = 0;
  let itemQuantity = 0;
  let totalPrice = 0;
  let continueLoop = false;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const prompt = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  await (async () => {
    try {
      itemPrice = Number(await prompt("Price: "));
      itemQuantity = Number(await prompt(`Quantity`));
      totalPrice = itemPrice * itemQuantity;
      const resContinue = await prompt(`continue`);
      if (String(resContinue).toLowerCase() == "y") continueLoop = true;
      //can prompt multiple times.
      items.push({ itemPrice, itemQuantity, totalPrice });
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
    console.log({ continueLoop });
    if (!continueLoop) break;
  }
};

main().catch();
