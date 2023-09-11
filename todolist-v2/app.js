const express = require("express");
const bodyParser = require("body-parser");
//const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const { name } = require("ejs");

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
 
const listSchema = {
    name: {
        type: String
    },
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);




app.get("/", (req, res) =>
{
    //const day = date.getDate();  
    Item.find().then((foundItems)=>{
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems).then(() => {
                console.log("Successfully added Default Items");
                res.redirect("/");
                })
              .catch((err) => {
                console.log(err);
              });

        } else {
            res.render("list", { listTitle: "Today", newListItems: foundItems});

        }
    }).catch((err)=>{ 
        console.log(err);
    });
    
});

app.get("/:customListName", async (req, res) => {
  const customListName = req.params.customListName;

  try {
    const foundList = await List.findOne({ name: customListName });

    if (!foundList) {
      console.log("Creating a new list");

      // Create and save the new list if it doesn't exist
      const list = new List({
        name: customListName,
        items: defaultItems,
      });

      await list.save();
      res.redirect("/" + customListName);
    } else {
      console.log("Found The list");
      res.render("list", {listTitle: foundList.name, newListItems:foundList.items});
    }
  } catch (err) {
    console.error(err);
  }
});

 
app.post("/", (req,res) => {

    const itemName = req.body.newItem;
    const item = new Item({
      name: itemName
    });
    item.save();
    res.redirect("/");
})

app.post("/delete", (req,res)=>{
    const checkedItemId =req.body.checkbox;
    Item.findByIdAndDelete(checkedItemId).then((checkedItemId)=>{
        console.log("Deleted :" + checkedItemId + " Successfully");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/");
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
