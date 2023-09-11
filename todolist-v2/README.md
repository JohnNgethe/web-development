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

Let's break down the key components:

1. `async` and `await`:
   - `async` is used to define an asynchronous function. It means that this function can perform asynchronous operations and will return a Promise.
   - `await` is used inside an async function to pause the execution of the function until a Promise is resolved. It allows you to write asynchronous code in a more synchronous-like manner.

2. `try` and `catch`:
   - `try` and `catch` are used for error handling in JavaScript.
   - Code within the `try` block is executed, and if any errors occur, the execution is immediately transferred to the `catch` block.
   - If there are no errors in the `try` block, the `catch` block is skipped.

Now, let's explain the code step by step:

- The code defines a route handler for GET requests with a custom parameter `:customListName` in the URL. This means it can handle URLs like `/exampleList`.

- Inside the route handler function, it extracts the value of `:customListName` from the request parameters using `req.params.customListName`.

- It then enters a `try` block, where it attempts to do the following:
   - It uses `await` with `List.findOne({ name: customListName })` to search for a list in a database (presumably a MongoDB database) with a name that matches the `customListName`.
   - If such a list is found (i.e., `foundList` is not `null`), it renders a view called "list" and passes data to it.
   - If no list is found, it logs "Creating a new list" and proceeds to create a new list with the provided name (`customListName`) and some default items (`defaultItems`).
   - It then saves this new list to the database using `await list.save()` and redirects the user to the same route (i.e., `/customListName`) to display the newly created list.

- If any errors occur within the `try` block, they will be caught by the `catch` block. The code will log the error using `console.error(err)`.

In summary, this code handles GET requests to a custom URL parameter, attempts to find a list with the provided name in a database, and either renders an existing list or creates a new list if none exists. It uses asynchronous operations (`async` and `await`) and error handling (`try` and `catch`) to manage potential issues during database interaction.

Let's use a simple story to explain `async` and `await`:

Imagine you're in a bakery, and you want to order a delicious cake. But here's the thing: baking the cake takes some time, and you don't want to stand in line doing nothing while the baker makes your cake. So, you have a plan.

1. **Async**: You tell the bakery that you're going to do something else while they bake your cake. You don't want to wait in line, so you say, "I'm going to read a book, and when the cake is ready, please let me know."

   In computer code, this is like saying `async`. It means, "Hey computer, I have other things to do, so let me know when this task is finished."

2. **Await**: You start reading your book while the bakery starts making your cake. You're not just standing there doing nothing; you're doing something else (reading). When the bakery finishes baking your cake, they tap you on the shoulder and say, "Your cake is ready!"

   In computer code, this is like saying `await`. It means, "I'm doing something else right now, but stop me and tell me when this specific thing is done."

So, `async` is like telling the computer you're going to do other stuff, and `await` is like telling the computer to pause your other stuff until a particular task is finished, just like you paused reading your book to get your cake when it was ready.
 

 Certainly, I'll explain the rewritten code step by step:

```javascript
app.post("/", async (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
      name: itemName
    });
    
    if (listName === "Today") {
        await item.save();
        res.redirect("/");
    } else {
        try {
            const foundList = await List.findOne({ name: listName });
            if (foundList) {
                foundList.items.push(item);
                await foundList.save();
                res.redirect("/" + listName);
            } else {
                console.log("List not found!");
                // Handle the case where the list doesn't exist
            }
        } catch (err) {
            console.error(err);
            // Handle any errors that occur during database operations
        }
    }
});
```

Here's what this code does:

1. It's an Express.js route handler that listens for POST requests at the root URL ("/").

2. It extracts two pieces of data from the request:
   - `itemName`: This is the name of an item that the user wants to add to a list.
   - `listName`: This is the name of the list where the user wants to add the item.

3. It creates a new `Item` object with the provided `itemName`.

4. It checks if the `listName` is "Today." If it is, it does the following:
   - It uses `await` to save the `item` to the database.
   - Then, it redirects the user back to the root URL ("/").

5. If the `listName` is not "Today," it enters the `else` block:
   - It tries to find a list in the database with the name matching `listName` using `await List.findOne({ name: listName })`.
   - If it finds a list (`foundList` is not `null`), it adds the `item` to the `items` array of that list using `foundList.items.push(item)`.
   - It then saves the updated list to the database using `await foundList.save()`.
   - Finally, it redirects the user to the URL corresponding to the list they modified (e.g., "/shopping").

6. If the list with the name `listName` is not found, it logs "List not found!" and doesn't perform any database operations. You can customize this part to handle the case where the list doesn't exist.

7. The code is wrapped in a `try...catch` block to handle any potential errors that might occur during database operations. If an error occurs, it's logged using `console.error(err)`, and you can add additional error handling logic as needed.