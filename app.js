const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceWebsite");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = 8000;

//define mongoose schema
const contactschema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  desc: String,
});
const contact = mongoose.model("contact", contactschema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});

app.get("/styles", (req, res) => {
  const params = {};
  res.status(200).render("styles.pug", params);
});

app.get("/shop", (req, res) => {
  const params = {};
  res.status(200).render("shop.pug", params);
});

// app.js (server-side)

// ... (other code)

app.get("/cart", (req, res) => {
  const cartItems = [
    // Add your cart item objects here
    {
      image: "/static/img/gatolococap.png",
      name: "Cactus-Tee",
      quantity: 2,
      price: 3000,
    },
    
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  res.status(200).render("cart.pug", { cartItems, subtotal });
});

app.get("/thatwasepiccap", (req, res) => {
  const params = {};
  res.status(200).render("thatwasepiccap.pug", params);
});

app.get("/A-Man-of-Great-Wealth", (req, res) => {
  const params = {};
  res.status(200).render("A-Man-of-Great-Wealth.pug", params);
});

app.get("/Skateboarder-Hoodie", (req, res) => {
  const params = {};
  res.status(200).render("Skateboarder-Hoodie.pug", params);
});

app.get("/Live-Life", (req, res) => {
  const params = {};
  res.status(200).render("Live-Life.pug", params);
});

app.get("/Gato-Loco", (req, res) => {
  const params = {};
  res.status(200).render("Gato-Loco.pug", params);
});

app.get("/Positive-Impression-Tee", (req, res) => {
  const params = {};
  res.status(200).render("Positive-Impression-Tee.pug", params);
});

app.get("/That-Was-Epic-Hoodie", (req, res) => {
  const params = {};
  res.status(200).render("That-Was-Epic-Hoodie.pug", params);
});

app.get("/Cactus-Tee", (req, res) => {
  const params = {};
  res.status(200).render("Cactus-Tee.pug", params);
});

app.post("/contact", (req, res) => {
  var mydata = new contact(req.body);
  mydata
    .save()
    .then(() => {
      res.send("this item has been saved to the database");
      // agar alert box use karna he instead of this item has been saved to the databse then ull have to use bootstrap
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
