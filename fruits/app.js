const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review:String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating:7,
    review:"awesome"
});

//fruit.save();
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);
const Rose = new Person({
    name: "Rose",
    age: 25
});
const Sue = new Person({
    name: "Sue",
    age:22
});
//Person.insertMany([Rose, Sue] );

const Pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "My Fave"
});
const Mango = new Fruit({
    name : "Mango",
    rating: 9,
    review: "Juicy"
});
const Grapes = new Fruit({
    name: "Grapes",
    rating: 9,
    review: "Cant get enough"
});

//Fruit.insertMany([banana, orange, kiwi]);

// Fruit.insertMany([Pineapple,Mango, Grapes]).then(()=>{
//     console.log("Success");
// }).catch((err)=>{
//     console.log(err)
// });

Fruit.find().then((fruits)=>{
    
    fruits.forEach((fruit)=>{
         console.log(fruit.name);
         mongoose.connection.close();
    });   
}).catch((err)=>{
    console.log(err)
});
