import { ICheckout } from "../checkout";
import { Item } from '../items/item';
import { PricingRules } from "./pricing-rules";

export class Dcheckout implements ICheckout<Item>{
    totalBill: number = 0;
    items: Item[] = [];

    constructor(private pricingRules : PricingRules){}
    scan(item: Item): void {
        this.items.push(item);
    }
    total(): number {
        this.totalBill = this.pricingRules.applyDeals(this.items, this.totalBill);
        return this.totalBill;
    }
    
}