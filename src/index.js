const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
mongoose.connect("mongodb://root:example@mongo:27017/express?authSource=admin");
const Customer = mongoose.model("Customer", { 
    name: String,
    surname: String,
    address: String,
    telefon: String
  });

  app.get("/genNewCustomer", (req, res) => {
    const Cust = new Customer({ 
      name: "Arber", 
      surname: "Marleku", 
      address: "Rr. Jakove Xoxa C44, Prishtine",
      telefon: "049600432"
    });
    Cust.save().then(() => res.json(Cust));
  });

  app.get("/getCustomer", (req, res) => {
    const Cust = Customer.find({ name: 'Arber' }, function (err, Customer) {
      res.json(Customer);
    });
  });

  app.get("/", (req, res) => {
    res.send("Hello world, How its Going?\n");
  });

app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
