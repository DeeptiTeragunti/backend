const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HRbVRAC1rbBs1kByqGxgNyzAyGoNlMAvI6F5f60Cfh0aQYbfhzjP6KfrEWrSfgE6zQT9t0ecZ95o0PZDoBK94h900avURK17M"
);

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello it works yeahhhh"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request recieved yeeee", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = app;
