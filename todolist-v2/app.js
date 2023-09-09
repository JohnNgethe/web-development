const express = require("express");
const bodyParser = require("body-parser");
//const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name:{
        type:String
    }
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your to do list"
});
const item2 = new Item({
    name: "Hit the + to add items"
});
const item3 = new Item({
    name: "<-- Hit this to delete item"
});

const defaultItems = [item1,item2,item3];



app.get("/", (req, res) =>
{
    //const day = date.getDate();  
    Item.find().then((foundItems)=>{
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems)
              .then(() => {
                console.log("Successfully added Default Items");
              })
              .catch((err) => {
                console.log(err);
              });

        } 
        res.render("list", { listTitle: "Today", newListItems: foundItems});

    }).catch((err)=>{ 
        console.log(err);
    });
    
});
 
app.post("/", (req,res) => {

    const item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    
    else{
        items.push(item);
    res.redirect("/");

    }

    
    
})

app.get("/work", (req,res)=>{
    res.render("list",
     {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/work", (req,res)=>{
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})




app.get("/about", (req, res)=>{
    res.render("about");
})

app.listen(3000, () =>
{
    console.log("Server started on Port 3000");
}
);
