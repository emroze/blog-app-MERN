const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "huisfdkjnf2243543@dklms"; //JWT secret

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://ememroze97:VYDwo9X2CI2d6NX0@cluster0.rax0mvf.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //Logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("OK");
    });
  } else {
    //Not logged in
    res.status(400).json("Wrong Credentials");
  }
  //res.json(passOk)
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  console.log(req);
  res.json(req.cookies);
  //console.log(token);
  //  jwt.verify(token, secret, {}, (err, info) => {
  //    if (err) throw err;
  //    res.json(info);
  //  });
});

app.listen(port);
