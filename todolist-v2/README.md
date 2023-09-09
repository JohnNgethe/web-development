This ia a to do list created using EJS, node and mongodb


We create a default item list and save it to an array. In our home route, we run an if statement to check whether the to do list is empty. If its empty, we add the custom items and redirect again to load.  We input the items and save them to newItem, It is saved upon capture by the submit button 





  <form action="/" method="post" class="item">
    <input type="text" name="newItem" placeholder="New item" autocomplete="off">
    <button type="submit" name="list" value=<%= listTitle %> >+</button>
  </form>


const defaultItems = [item1,item2,item3];



app.get("/", (req, res) =>
{ 
    Item.find().then((foundItems)=>{//const day = date.getDate();
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
 
app.post("/", (req,res) => {

    const itemName = req.body.newItem;
    const item = new Item({
      name: itemName
    });
    item.save();
    res.redirect("/");
})



i created a form shown bwlow which checks all items in my list. The form also allows us to display the items and delete.
Displaying,
We display the items when we first looped all the contents of our to do list using the for each. Because we save our content with other features like the ID we do not wish to display the content saved under the name value hence item.name.

Deleting,
The form allows to handle deletion where we give it a redirection and a post method whic will be handled by the app.js. We want our checkbox to act like a delete button, the onChange functionality allows us to dothis. we add "this.form.submit() which lets the checkbox submit upon checking. name is our variable where it assigned checkbox. In the routing part we assign the captured value ie item._id which is unique to all items and assigned to checkbox where it is checked using .findByIdAndDelete and deleted successsfully. we then redirect to our home route and home route renders the items as explained above.
<div class="box">
     <%newListItems.forEach((item) => {  %>
     <form action="/delete" method="post">
        <div class="item">
            <input type="checkbox" value="<%= item._id %>" name="checkbox" onChange="this.form.submit()">
            <p><%= item.name %></p>               
        </div>
     </form>
     <%  });%> 

//app.js
app.post("/delete", (req,res)=>{
    const checkedItemId =req.body.checkbox;
    Item.findByIdAndDelete(checkedItemId).then((checkedItemId)=>{
        console.log("Deleted :" + checkedItemId + " Successfully");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/");
});
            


     <form action="/" method="post" class="item">
       <input type="text" name="newItem" placeholder="New item" autocomplete="off">
       <button type="submit" name="list" value=<%= listTitle %> >+</button>
 
      </form>
     </div>