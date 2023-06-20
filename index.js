const mongoose = require("mongoose")
require('dotenv').config();
mongoose.set('strictQuery', true);
const express = require("express")
const nocache = require('nocache');
const app = express()

const { dbpath } = require('./config/connection');

mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection is successful');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connection is successful');
});
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

//app.use(mongoSanitize());

const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

const forgotPassword = require("./routes/forgotPassword");
app.use("/forgot",forgotPassword);

app.get('/loadcart', (req, res) => {
  
  const products = [
    { name: 'Product 1', price: 10, description: 'Product 1 description' },
    { name: 'Product 2', price: 20, description: 'Product 2 description' },
    
  ];
  
  res.render('cart', { product: products });
});


app.use("/forgot", forgotPassword);

app.all("*", (req, res) => {
  res.render("error")
})

app.listen(3000, function () {
  console.log("server is running at 3000");
});



