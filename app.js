const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

var items = ["Read", "Meditate", "Workout"];
var workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let day = date();
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  // res.render("list", {newListItem: item});
  // This causes error because we have give both value kindOfDay and newListItem. So instead of this just redirect item.
  if(req.body.list === 'Work'){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work Title", newListItems: workItems});
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, () => {
  console.log("Server Started");
});