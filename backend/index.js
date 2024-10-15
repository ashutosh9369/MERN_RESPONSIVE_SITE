const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//model
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//Sign Up
app.post("/Signup", async (req, res) => {
  // console.log(req.body);
  const { email, password, ...rest } = req.body;

  const existingUser = await userModel.findOne({ email: email });

  if (!existingUser) {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, password: hashedPassword, ...rest });
    await newUser.save();
    res.send({ message: "Successfully Signed Up", alert: true });
  } else {
    res.send({ message: "Email Id is already registered", alert: false });
  }

  // const data = await userModel.findOne({ email: email });

  // if (!data) {
  //   // If the email is not found in the database, create a new user
  //   const newUser = new userModel(req.body);
  //   await newUser.save();
  //   res.send({ message: "Successfully Signed Up", alert: true });
  // } else {
  //   // If the email is already registered
  //   res.send({ message: "Email Id is already registered", alert: false });
  // }
});

//login
app.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user) {
    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const dataSend = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      };
      res.send({ message: "Login successfully", alert: true, data: dataSend });
    } else {
      res.send({ message: "Incorrect password", alert: false });
    }
  } else {
    res.send({ message: "This email is not registered", alert: false });
  }
  // if (data) {
  //   // If the email is already registered

  //   const dataSend = {
  //     _id: data._id,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //     password: data.password,
  //     image: data.image,
  //   };
  //   console.log(dataSend);
  //   res.send({ message: "Login successfully", alert: true, data: dataSend });
  // } else {
  //   res.send({
  //     message: "This email is not registered or wrong password",
  //     alert: false,
  //   });
  // }
});

// Password Reset

app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful, Now go to login page..." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

//Product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//Save Product in database
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body);
  const dataSave = await data.save();
  res.send({ message: "Upload Successfully" });
});

//fetching New Product data

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//Payment Gateway
console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1Q9TSIP1gyt3MtEwxOtzwOc6" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    // console.log(session);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

//Server is running
app.listen(PORT, () => console.log("server is running at port " + PORT));
