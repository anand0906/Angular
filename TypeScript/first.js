console.log("Anand Pasam");
var myname = "Anand";
console.log(typeof myname);
//myname = 2; throws error since it is auto assigned to string
var myage = 10;
myage = "Anand";
var stock = true;
var percentage = 2;
var age = [1, 2, 3];
age.push(10);
console.log(age);
var names = [];
console.log(names);
//names.push(2) throws error
var mydetails;
mydetails = ["Anand", 10, true];
console.log(mydetails);
var mydetails2;
mydetails2 = mydetails;
console.log(mydetails2);
var details;
details = { name: "anand", age: 2 };
console.log(details);
var details2;
details2 = { name: "Anand" };
console.log(details2, details2.age);
var directions;
(function (directions) {
    directions[directions["north"] = 0] = "north";
    directions[directions["south"] = 1] = "south";
})(directions || (directions = {}));
console.log(directions.north);
var directions2;
(function (directions2) {
    directions2[directions2["north"] = 100] = "north";
    directions2[directions2["south"] = 101] = "south";
})(directions2 || (directions2 = {}));
console.log(directions2.south);
var direction3;
(function (direction3) {
    direction3["north"] = "north";
    direction3["south"] = "south";
})(direction3 || (direction3 = {}));
console.log(direction3.south);
