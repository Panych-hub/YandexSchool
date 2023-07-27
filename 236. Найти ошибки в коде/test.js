const participants = ["Mary", "Kate"];
const sports = ["football", "hockey"];
const orderIndexes = [];
let i = sports.length;

while (i--) {
    orderIndexes.push(function() {
        return i;
    });
}
// i = sports.length;
console.log(orderIndexes.map(

    (getSportIndex, i) =>{
        console.log(i);
        return [sports[i], participants[getSportIndex()]]
    }))
