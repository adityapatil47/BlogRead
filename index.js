import express from "express";
import bodyParser from "body-parser";

import * as db from "./db.js";

const app = express();
const PORT = 3000;
var username = "";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Required for handling JSON payload from AJAX

db.rFile();

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/submit", (req, res) => {
  username = req.body.username;
  // const password = req.body.password;
  // console.log(username, password);
  res.redirect("/myPosts");
});

app.get("/newPost", (req, res) => {
  res.render("newPost", { name: username });
});

app.post("/newPost", (req, res) => {
  res.redirect("/newPost");
});

app.post("/submitPost", (req, res) => {
  const data = {
    title: req.body.title,
    blog: req.body.blog,
    isLiked: false,
  };
  db.submitPost(data);
  res.redirect("/myPosts");
  // console.log(`New post added: ${data.title}`);
});

app.get("/editPost", (req, res) => {
  const postIndex = req.query.index;
  const post = db.json[postIndex];
  res.render("editPost", { post: post, postIndex: postIndex, name: username });
});

app.post("/editPost", (req, res) => {
  const postIndex = req.body.postIndex;
  const updatedTitle = req.body.title;
  const updatedBlog = req.body.blog;
  db.editPost(postIndex, updatedTitle, updatedBlog);
  res.redirect("/myPosts");
  // console.log(`Post at index ${postIndex} updated.`);
});

app.post("/toggleLike", (req, res) => {
  const postIndex = req.body.postIndex;
  db.json[postIndex].isLiked = !db.json[postIndex].isLiked;
  db.wFile();
  res.json({ success: true, isLiked: db.json[postIndex].isLiked });
});

app.post("/postFeatures", (req, res) => {
  const postIndex = req.body.postIndex;
  const action = req.body.action;
  if (action === "delete") {
    db.deletePost(postIndex);
    // console.log(`Post at index ${postIndex} deleted.`);
    res.redirect("/myPosts");
  } else if (action === "edit") {
    res.redirect(`/editPost?index=${postIndex}`);
  } else if (action === "like") {
    db.likePost(postIndex);
    // console.log(`Post at index ${postIndex} liked.`);
    res.redirect("/myPosts");
  } else if (action === "unlike") {
    db.unlikePost(postIndex);
    // console.log(`Post at index ${postIndex} unliked.`);
    res.redirect("/likedPosts");
  } else {
    res.redirect("/myPosts");
  }
});

app.get("/likedPosts", (req, res) => {
  // const likedPosts = db.json.filter((post) => post.isLiked);
  res.render("likedPosts", {
    name: username,
    posts: db.json,
  });
});

app.get("/myPosts", (req, res) => {
  res.render("myPosts", { name: username, posts: db.json });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
