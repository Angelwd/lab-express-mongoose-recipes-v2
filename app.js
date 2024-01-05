const express = require("express");
const logger = require("morgan");
const app = express();
const Recipe = require ("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  //create new recipe using the data from req.body

  Recipe.create(
      req.body
  )
    .then((createdRecipe) => {
      //Respond with the newly created recipe and a 201 status code
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while creating a new recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  //Get all the recipes from the database
  Recipe.then((allRecipes) => {
    //Respond with the recipe data and a 200 status code
    res.status(200).json(allRecipes);
  }).catch((error) => {
    res.status(500).json({ message: "Error while getting all recipes" });
  });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
    //Get the recipe from the database using the query param id from the url
    Recipe.findById(req.params.id)
    .then((recipe)=>{
     //Respond with the recipe data and a 200 status code   
     res.status(200).json(recipe);
    })
      .catch((error) => {
      res.status(500).json({ message: "Error while getting a single recipe" });
    });
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("recipes/:id", (req,res)=>{
    //Update the recipe using the id from the url and the data from req.body
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedRecipe)=>{
      //Respond with the updated recipe and a 200 status code
      res.status(200).json(updatedRecipe)
    })
    .catch((error)=>{
        res.status(500).json({ message: "Error while updating a single recipe"})
    })
})





//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route


app.delete("recipes/:id", (req,res)=>{
    //Delete the recipe using the query param id from the url
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
      //Once the document has been deleted, respond with 204 and no content
      res.status(204).send()
    })
    .catch((error)=>{
        res.status(500).json({ message: "Error while deleting a single recipe"})
    })
})







// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
