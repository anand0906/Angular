console.log("Anand Pasam"); 
let myname="Anand"
console.log(typeof myname)
//myname = 2; throws error since it is auto assigned to string
let myage: any = 10;
myage = "Anand";
let stock: boolean = true;
let percentage: number = 2;
let age: number[] = [1, 2, 3];
age.push(10)
console.log(age);
let names: readonly string[] = [];
console.log(names);
//names.push(2) throws error
let mydetails: [string, number, boolean];
mydetails = ["Anand", 10, true];
console.log(mydetails);
let mydetails2: [name: string, age: number, gender: boolean];
mydetails2 = mydetails;
console.log(mydetails2);
let details: { name: string, age: number };
details = { name: "anand", age: 2 };
console.log(details);
let details2: { name: string, age?: number };
details2 = { name: "Anand" }
console.log(details2, details2.age);
enum directions{
    north,
    south
}
console.log(directions.north);
enum directions2{
    north=100,
    south
}
console.log(directions2.south);
enum direction3{
    north="north",
    south="south"
}
console.log(direction3.south);