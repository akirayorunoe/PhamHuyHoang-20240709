const stockPriceList = [2, 3, 6, 4, 3];

const calculateMaxProfit=(array)=>{
    let maxProfit = 0
    for(let i=0;i<array.length-1;i++){
        for(let j=i+1;j<array.length;j++){
            const currentProfit = array[j]-array[i]
            if(currentProfit>maxProfit) maxProfit=currentProfit
        }
    }
    return maxProfit
}

const maxProfit = calculateMaxProfit(stockPriceList)
console.log(maxProfit)