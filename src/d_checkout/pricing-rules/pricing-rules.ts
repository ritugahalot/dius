import { DefaultAppleTv, DefaultIpad, DefaultMacBook, DefaultVGAAdapter } from '../../default/default-items';
import { Item } from '../../items/item';
export class PricingRules{
    public applyDeals(items: Item[], totalBill: number){
        if(items)
        {
            totalBill = applyAppleTvDeal(items, totalBill);
            totalBill = applyIPadDeal(items, totalBill);
            totalBill = applyMacBookDeal(items, totalBill);
            totalBill = applyVGA(items, totalBill);

        }
        return totalBill;
    }
}


function applyAppleTvDeal(items: Item[], totalBill: number) {
    const atvCount = items?.filter(x => x.sku == 'atv')?.length;
        if(atvCount > 0){
        const atvPrice = items
        const noOfTv = Math.ceil(atvCount / 3 * 2) ;
        totalBill = totalBill + (noOfTv * DefaultAppleTv.Price);
        }
        return totalBill;
}

function applyIPadDeal(items: Item[], totalBill: number) {
    if(items)
    {let ipadCount = items.filter(x => x.sku == 'ipd')?.length;
        if(ipadCount >= 4)
        {
            while(ipadCount >0)
            {
            const x = Math.ceil(ipadCount / 4);
            totalBill = totalBill + (x * DefaultIpad.DiscountedPrice);
            ipadCount = ipadCount - x ;
            }
        }
        else{
            totalBill = totalBill + ipadCount * DefaultIpad.Price;
        }

    }
    return totalBill;
}

function applyMacBookDeal(items: Item[], totalBill: number) {
    if(items)
    { let macBookCount = items.filter(x => x.sku == 'mbp')?.length;
        if(macBookCount > 0)
        {
            while(macBookCount > 0)
            {
                items.push({sku: 'vga', name: 'VGA Adapter', price: 0, isBillable:false});
                totalBill += DefaultMacBook.Price;
                macBookCount --;
            }
        } 
    }
    return totalBill;
}

function applyVGA(items: any, totalBill: any) {
    if(items)
    { let vgaCount = items.filter(x => x.sku == 'vga' && x.isBillable == true)?.length;
        if(vgaCount > 0)
        {
            while(vgaCount > 0)
            {
                totalBill += DefaultVGAAdapter.Price;
                vgaCount --;
            }
        } 
    }
    return totalBill;
}

