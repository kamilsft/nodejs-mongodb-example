const mongoose = require('mongoose');

// creating fruitsDB and connecting to the databse fruitsDB
mongoose.connect('mongodb://localhost:27017/FruitDB', {
  useNewUrlParser: true
});
console.log("Connected");

mongoose.set('strictQuery', true);

// creating a new schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"];
  }
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// after creating a schema we need to create a mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

// creating a new fruit documents
const fruit = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Great Fruit"
});
fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Kamil",
  age: 19
});

//person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "One of the best fruits"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 6,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 8,
//   review: "Weird texture"
// });

// inserting kiwi orange banana to the fruit db
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err){
//     console.log(err);
//   } else{
//     console.log("Succesfully saved all the fruits to FruitDB");
//   }
// });

// adding shamil to the People database
async function addPerson() {
  await Person.collection.insertOne({name: "Shamil", age: 16})
}
addPerson();

const vegetableSchema = new mongoose.Schema({
  name: String,
  score: Number,
  review: String
});

const Vegetable = mongoose.model("Vegetable", vegetableSchema);

const potato = new Vegetable({
  name: "Potato",
  score: 9,
  review: "Very fullfill vegetable"
});
potato.save();

const carrot = new Vegetable({
  name: "Carrot",
  score: 7,
  review: "Weird taste"
});
carrot.save();



// adding one more vegetable to the Vegetables db
async function addVegetable() {
  await Vegetable.collection.insertOne({name: "Onion", score: 8, review: "Just good"});
};
addVegetable();

Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  } else {
    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});
