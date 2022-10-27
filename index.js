const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipe1 = {
  title : 'Chocolat Cake',
  level: 'Easy Peasy',
  ingredients : ['Chocolat', 'Butter', 'sugar','flour'],
  cuisine : 'dessert',
  image : "https://images.media-allrecipes.com/images/75131.jpg",
  duration : 15,
  creator : 'Will Smith',
  created : 27/10/2022,
  }

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

// Create a recipe
.then(() => {
  return Recipe.create(recipe1)
})
//insert multiple recipes
  .then(() => {
  return Recipe.insertMany(data)
})
.then((allRecipes) => {
console.log('Recipes created',allRecipes)
return Recipe.findOneAndUpdate({title :'Chocolat Cake'},{created : '2022-10-27T14:14:42.658+00:00'},{new:true} )
})
 //Update Recipe1
.then((updatedRecipe) => { 
  console.log('Date been updated',updatedRecipe)
  return Recipe.findOneAndUpdate({title :'Rigatoni alla Genovese'},{duration : 100},{new:true} )
})

//Delete a recipe
.then((deleteRecipe) => { 
  console.log('Recipe has been updated',deleteRecipe)
  return Recipe.deleteOne({title :'Carrot Cake'})
})
 
  .catch(error => {
    console.error('Error', error);
  });

  mongoose.disconect()
.then(()=> {
console.log('we are dicnonnected');
})