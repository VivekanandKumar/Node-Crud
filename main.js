require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/routes");

//database connection
mongoose.connect(process.env.URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Database Connected");
});

// middlewares
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(
  session({
    secret: "My Secret Key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//routes prefix
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(routes);

// server code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Started at port " + PORT);
});
