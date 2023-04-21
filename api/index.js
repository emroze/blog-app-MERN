const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

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

app.post('/login', (req,res)=>{
	const {username, password} = req.body;
	const userDoc = User.find({username});

	console.log(username," ", password)
})

app.listen(port);
