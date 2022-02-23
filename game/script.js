var golds = 0;
var gps = 0;
var c = 1;
var counter = 1;


var minions = [
    { id: 1, name: "SSJ1", cost: 10, gps: 1, owned: 0 },
    { id: 2, name: "SSJ2", cost: 100, gps: 10, owned: 0 },
    { id: 3, name: "SSJ3", cost: 500, gps: 50, owned: 0 }
];

function getGPS() {
    gps = 0;
    minions.forEach(function (minion) {
        gps += minion.gps * minion.owned;
    });
    addGps();
    displayItem();
    load();
}

function addGold(c){
    golds += c;
    displayGolds();
}

function addGps(){
    setInterval(function () {
        golds += gps;
        displayGolds();
    }, 1000);
    displayGPS();
}

function displayGolds(){
    document.querySelector("#score").innerHTML = golds;
    save();
}

function displayGPS() {
    document.querySelector("#goldpersec").innerHTML = gps;
}

function buyMinion(id) {
    const item = minions.find(minion => minion.id === id);
    if (golds >= item.cost) {
        golds -= item.cost;
        gps += item.gps; 
        item.owned += 1;
        item.cost = item.cost * 1.15;
    }

    if (item.id === 1) {
        document.querySelector("#owned1").innerHTML = item.owned;
    }
    else if (item.id === 2) {
        document.querySelector("#owned2").innerHTML = item.owned;
    }
    else {
        document.querySelector("#owned3").innerHTML = item.owned;
    }

    if (item.owned === 25 || item.owned === 50 || item.owned === 100 || item.owned === 250 || item.owned === 1000) {
        item.gps = item.gps * 2;
        console.log(item.gps);
    }
    displayGolds();
    displayGPS();
    displayItem();
    save();
}

function displayItem() {
    let item1 = minions.find(minion => minion.id === 1);
    let item2 = minions.find(minion => minion.id === 2);
    let item3 = minions.find(minion => minion.id === 3);
    
    document.querySelector("#object1").innerHTML = item1.name;
    document.querySelector("#object2").innerHTML = item2.name;
    document.querySelector("#object3").innerHTML = item3.name;

    document.querySelector("#price1").innerHTML = item1.cost;
    document.querySelector("#price2").innerHTML = item2.cost;
    document.querySelector("#price3").innerHTML = item3.cost;

    let sum = item1.owned + item2.owned + item3.owned;
    if (sum / counter === 50) {
        c = c * 2;
        counter++;
    }
}

function save() {
    //localStorage.setItem("golds", golds);
    localStorage.setItem("gps", gps);
    localStorage.setItem("c", c);
    localStorage.setItem("counter", counter);
    localStorage.setItem("savedData", JSON.stringify(minions));
}

function load() {
    counter = localStorage.getItem("counter");
    c = localStorage.getItem("c");
    gps = localStorage.getItem("gps");
    //golds = localStorage.getItem("golds");
    minions = JSON.parse(localStorage.getItem("savedData"));
    counter = parseInt(counter);
    c = parseInt(c);
    gps = parseInt(gps);
    golds = parseInt(golds);
    document.getElementById("score").value = golds;
    document.getElementById("goldpersec").value = gps;

    let item1 = minions.find(minion => minion.id === 1);
    let item2 = minions.find(minion => minion.id === 2);
    let item3 = minions.find(minion => minion.id === 3);

    document.querySelector("#owned1").innerHTML = item1.owned;
    document.querySelector("#owned2").innerHTML = item2.owned;
    document.querySelector("#owned3").innerHTML = item3.owned;

    document.querySelector("#price1").innerHTML = item1.cost;
    document.querySelector("#price2").innerHTML = item2.cost;
    document.querySelector("#price3").innerHTML = item3.cost;

    document.querySelector("#score").innerHTML = golds;
    document.querySelector("#goldpersec").innerHTML = gps;
}
