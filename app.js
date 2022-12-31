require("dotenv").config();
const path = require("path");
const express = require("express");

const db = require("./database/database");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/customer/"),
]);
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render("errors/500");
});

app.use("*", (req, res) => {
  res.status(404).render("errors/404");
});

db.connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log("Failed to connect to database");
    console.log(error);
  });
