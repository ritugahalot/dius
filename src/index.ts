import {Item } from './items';
import { Dcheckout } from './d_checkout/checkout';
import { PricingRules } from './d_checkout/pricing-rules/pricing-rules';
import * as readline from 'readline';

let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const pricingRules = new PricingRules();

const chkout = new Dcheckout(pricingRules);
let more = 1;

async function scanItems(){
    r1.question("Enter item sku: ", (answer1) => {
        const item = new Item();
        item.sku = answer1;
        chkout.scan(item);
    r1.question("Do you want more ", function (answer) {
        if (answer == "no" || answer == "n") {
            more = 0;
            r1.close();
            const result = chkout.total();
            console.log("Your total bill: ", result);
        } else {
            more++;
            scanItems();
        }
    });
});
}
try
{
    console.log("Welcome to Dius shopping center.")
    
    scanItems();
}catch(err)
{
    console.error(err);
}

