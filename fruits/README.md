This project was a learning experience of using mongodb with mongoose. 
mongoose is a simpler way to connect and avoid the hustle of direct interaction with mongodb.

Steps to be followed
1. Install Mongoose
npm i mongoose

2. Create a connection 
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true});
 
 fruitsDB is the name of the DB the above creates it if it doesnt exist.

 3. Create schema
 In mongoose you are required to create a schema example:

 const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review:String
});

4. Create a model refrencing the schema, example:
const Fruit = mongoose.model("Fruit", fruitSchema);
NOTE: mongoose uses the lodash module. In our example "Fruit" is our collection name but in our database, mongoose with lowercase it and make it plural. If you access mongodb, access our db(fruitsDB) using "use fruitsDB" command and pass "show collections" , the collection that will appear will be "fruits"

5. You can now create documents using the model. Example:
const Apple = new Fruit({
    name: "Apple",
    rating:7,
    review:"awesome"
});

6. To send a single document created, one can use 
Apple.save() command.
If youve created multiple documents. use the following
Fruit.insertMany([banana, orange, kiwi]);
or to get more details about whats happening. use
.then().catch()
.find(), .insert() etc no longer accept function call backs hence the above is used
.then(): this will bring results to your terminal where you will run node app.js
.catch() normally used to catch errors
example:

Fruit.insertMany([Pineapple,Mango, Grapes]).then(()=>{
     console.log("Success");
 }).catch((err)=>{
     console.log(err);
 });

 7. To close connection in our terminal we add mongoose.connection.close() in our .then(), example below where we are searching for the name of our fruits and displaying the name only. i have used for each instead of a for loop because its much cleaner
 
 Fruit.find().then((fruits)=>{
    
    fruits.forEach((fruit)=>{
         console.log(fruit.name);
         mongoose.connection.close();
    });   
}).catch((err)=>{
    console.log(err)
});

8. Mongoose adds validation for our data,
example:
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

const DragonFruit = new Fruit({

    rating:4,
    review:"awesome"
});


In the above schema, the validation occurs in the name and ratings. In our document "DragonFruit, a validation error will occur since we did the name is empty or rather doesnt exist, this keeps our db clean

9. To update and delete records, we use the (.then().catch()) since the model.updateOne, model.deleteOne() does not support function call backs.
Example:
Update documents: we provide the target identifier inside {} where it can be id, name or any unique field. 

Fruit.updateOne({ _id: "64f79dc2c7d9ed45390984c3"}, {rating:10})
.then(()=>{
    console.log("Update Successful");
    mongoose.connection.close();
})
.catch((err)=>{
    console.log(err);
});

Similar to update

Fruit.deleteOne({ _id: "64f79dc2c7d9ed45390984c3" })
  .then(() => {
    console.log("Delete Successful");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });