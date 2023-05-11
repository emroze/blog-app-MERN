const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET; //"huisfdkjnf2243543@dklms"; //JWT secret

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  process.env.MONGO_URL
  //"mongodb+srv://ememroze97:VYDwo9X2CI2d6NX0@cluster0.rax0mvf.mongodb.net/?retryWrites=true&w=majority"
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
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    //Not logged in
    res.status(400).json("Wrong Credentials");
  }
  //res.json(passOk)
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  console.log(typeof token);

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        fs.unlink(newPath, (err) => {
          if (err) throw err;
        });
        console.log("file delelted");
        throw err;
      }
      const { title, summary, content } = req.body;
      const postedDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      res.json(postedDoc);
    });
  } else {
    res.status(401).json("failed");
  }
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = path + "." + extension;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
          fs.unlink(newPath, (err) => {
            if (err) throw err;
          });
          console.log("file delelted");
          throw err;
        }
        const {id,title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor){
          return res.status(400).json("Invalid Author");
        }

        await postDoc.updateOne({
          title,
          summary,
          content,
          cover: newPath ? newPath : postDoc.cover,
        })

        res.json(postDoc);

      });
    }
  }
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(port);
