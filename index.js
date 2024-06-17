const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

//Database Connection && Schemas...
const ConnectDB = require("./DB/Config");
const data = require("./DB/RegisterSche");
const ProductSche = require("./DB/Product");
const BuyProduct = require("./DB/BuyProduct");

const app = express();
const PORT = process.env.PORT || 2030;

app.use(express.json());
app.use(cors());
// app.use(morgan("start"));
dotenv.config();
//Call Database Connection
ConnectDB();

app.post("/register", async (req, res) => {
  let user = new data(req.body);
  let result = await user.save();
  res.send(result);
});

const admin_email = "admin@gmail.com";
const admin_pass = "admin123";
app.post("/Login", async (req, res) => {
  if (req.body.password && req.body.email) {
    if ((req.body.password === admin_pass) && (req.body.email === admin_email)) {
      const admin = { admin_email, admin_pass };
      res.send(admin);
    } else {
      let user = await data.findOne(req.body).select("-username");
      if (user) {
        res.send(user);
      } else {
        res.send(null);
      }
    }
  } else {
    res.send(null);
  }
});

app.post("/CrudApp/product", async (req, res) => {
  const data = new ProductSche(req.body);
  const result = await data.save();
  if (result) {
    res.send(true);
  }
});

app.get("/CrudApp/product", async (req, res) => {
  const data = await ProductSche.find();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "Product List is Empty" });
  }
});

app.delete("/CrudApp/product/:id", async (req, res) => {
  const result = await ProductSche.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.put("/CrudApp/product/:id", async (req, res) => {
  const result = await ProductSche.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  const result = await ProductSche.find({
    $or: [
      { name: { $regex: req.params.key } }
      // { price: { $regex: req.params.key } },
      // multiple filed for search if we want
      // { category: { $regex: req.params.key } },
      // { company: { $regex: req.params.key } }
    ],
  });
  res.send(result);
});

app.post("/CrudApp/buy", async (req, res) => {
  const data = new BuyProduct(req.body);
  const result = await data.save();
  if (result) {
    res.send(
      {
        status: true,
        message: "Buying Successfull...!",
        result
      }
    )
  } else {
    res.send({
      status: false,
      message: "Buying Not Successfull...!",
      result
    })
  }
});

app.get("/CrudApp/buy/:id", async (req, res) => {
  const result = await BuyProduct.find({ userId: req.params.id });
  res.send(result);
})

app.put("/CrudApp/product/BuyQut/:id", async (req, res) => {
  const result = await ProductSche.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.listen(PORT, () =>
  console.log(
    `Server Start... ${process.env.DEV_MODE} Mode On Port No. ${PORT};`
  )
);
