import express from "express";
import localStorage from "localStorage";
import fs from "fs";
import { date } from "./date.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localStorage setting for database
fs.readFile("./data.json", function (err, data) {
  localStorage.setItem("blogs", data);
});

app.get("/", (req, res) => {
  let blogsParsed = JSON.parse(localStorage.getItem("blogs"));
  res.render("index.ejs", { blogs: blogsParsed });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/delete", (req, res) => {
  let blogsParsed = JSON.parse(localStorage.getItem("blogs"));
  res.render("delete.ejs", { blogs: blogsParsed });
});

app.get("/update", (req, res) => {
  let blogsParsed = JSON.parse(localStorage.getItem("blogs"));
  res.render("update.ejs", { blogs: blogsParsed });
});

app.post("/new", (req, res) => {
  let blogs = JSON.parse(localStorage.getItem("blogs"));
  blogs.push({
    title: req.body.title,
    date: date(),
    text: req.body.text,
  });
  localStorage.setItem("blogs", JSON.stringify(blogs));
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  if (req.body.blogIndex === "Select Your Blog to Delete") {
    res.redirect("/delete");
  } else {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.splice(req.body.blogIndex, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    res.redirect("/");
  }
});

app.post("/select", (req, res) => {
  let index = req.body.index;
  if (index >= 0) {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    let title = blogs[index].title;
    let text = blogs[index].text;
    res.json({ title: title, text: text });
  }
});
app.post("/update", (req, res) => {
  if (req.body.blogIndex === "Select Your Blog to Update") {
    res.redirect("/update");
  } else {
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.splice(req.body.blogIndex, 1);
    blogs.push({
      title: req.body.title,
      date: date(),
      text: req.body.text,
    });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
