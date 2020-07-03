//Determinarea regulilor de asociere pe utilizand MapReduce
const fs = require('fs')
const itemsets = fs.readFileSync('./retail.dat.txt').toString().trim().split('\n').map(line => line.trim().split(' ').map(n => parseInt(n)))

// Algoritm 1 - output toti itemii itemsets
for(const itemset of itemsets) {
    console.log(itemset)
    break
}

//Algoritm 2 - fiecae support a liste care contine 1 creste cu 1
for(let i = 0; i < itemsets.length; i++)
    itemsets[i] = {local_support: 0, support: 0, itemset: itemsets[i]}
for(const itemset of itemsets) {
    if(itemset.itemset.includes(1)) {
        itemset.local_support++
    }
    console.log(itemset.itemset, itemset.local_support)
    break //eliminati break daca doriti note complete la acest exercitiu

}
//Algoritm 3 - calculam support and adaugam local support, printam treshhold itemsets
const minSupport = 404  //presupunem

for(const itemset of itemsets) {
    for(const itemsetAdj of itemsets) {
        if(itemset != itemsetAdj) {
            if(itemset.itemset.filter(x => itemsetAdj.itemset.includes(x)).length == itemset.itemset.length) {
                itemset.support++
            }
        }
    }
    itemset.support = itemset.support + itemset.local_support
    if(itemset.support >= minSupport) {
        console.log(itemset.itemset, itemset.support)
    }
}
