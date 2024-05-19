const createError = require("http-errors");
const cors = require('cors')
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((error) => console.log(error));
async function main() {
	await mongoose.connect(mongoDB);
	console.log("connected");
}

app.get("/api", (req, res) => {
  console.log('is this working')
  res.json({
      message: "Welcome to the API",
  });
});

app.post("/api/login", (req, res) => {
  // mock user
  const user = {
      id: 1,
      username: "jonathan",
      password: "jon@gmail.com",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
      res.json({
          message: "Auth passed",
          token,
      });
  });
}); 

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
          throw new Error("error");
      } else {
          res.json({
              message: "Post created",
              authData,
          });
      }
  });
});

//verify token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer;
    // Set the token
    req.token = bearerHeader;
    next();
  } else {
    // Forbidden
    throw new Error("Forbidden");
  }
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
