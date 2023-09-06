const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "No fruit added"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const DragonFruit = new Fruit({

//     rating:4,
//     review:"awesome"
// });

// //DragonFruit.save();


// const Pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 9,
//     review: "My Fave"
// });
// const Mango = new Fruit({
//     name : "Mango",
//     rating: 9,
//     review: "Juicy"
// });
const Grapes = new Fruit({
    name: "Grapes",
    rating: 9,
    review: "Cant get enough"
});
//Grapes.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});


const Person = mongoose.model("Person", personSchema);
const Mary = new Person({
  name: "Mary",
  age: 25,
  favouriteFruit: Grapes
});

const Carol = new Person({
  name: "Carol",
  age: 22,
  favouriteFruit: Grapes
});

//Person.insertMany([Mary, Carol]);

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
Person.find().then((people)=>{
    people.forEach((person)=>{
        console.log([person.name, person.age]);
    });

}).catch((err)=>{
    console.log(err);
});

Person.updateOne({name:"Rose"},{favouriteFruit: Mango}).then(()=>{
    console.log("Success");
}).catch((err)=>{
    console.log(err);
});
// Fruit.updateOne({ _id: "64f79dc2c7d9ed45390984c3"}, {rating:10})
// .then(()=>{
//     console.log("Update Successful");
// })
// .catch((err)=>{
//     console.log(err);
// });

// Fruit.deleteOne({ _id: "64f79dc2c7d9ed45390984c3" })
//   .then(() => {
//     console.log("Delete Successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });