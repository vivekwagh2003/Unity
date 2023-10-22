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
  price: Number,
});
const contact = mongoose.model("contact", contactschema);

const cartschema = new mongoose.Schema({
  proName: String,
  proImage: String,
  quantity: Number,
  size: String,
  price: Number,
});
const cart = mongoose.model("cart", cartschema);

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

app.get("/account", (req, res) => {
  const params = {};
  res.status(200).render("account.pug", params);
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
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
});

app.post("/Skateboarder-Hoodie", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/Positive-Impression-Tee", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/That-Was-Epic-Hoodie", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/Live-Life", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/Gato-Loco", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/thatwasepiccap", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/Cactus-Tee", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});
app.post("/A-Man-of-Great-Wealth", (req, res) => {
  var mydata = new cart(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/cart"); // Redirect to the cart page
    })
    .catch(() => {
      res.status(400).send("item was not added to the cart");
    });
});

app.get("/cart", async (req, res) => {
  try {
    const cartItems = await cart.find(); // Fetch all items from the cart collection
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    res.status(200).render("cart.pug", { cartItems, subtotal });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cart items");
  }
});
app.post("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await cart.findByIdAndDelete(productId);
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item from cart");
  }
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
