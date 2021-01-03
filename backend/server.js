const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const flash = require("express-flash");
const cors = require("cors");

const app = express();

const User = require('./models/user.model');
const userRoute = require("./routes/user.route");

//middlewares
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//db config
mongoose.connect(process.env.MONGO_DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.once("open", () => {
    console.log("MongoDB connection successfull...");

});

//api routes
app.get("/", (req, res) => {
    res.send("Welcome back kutti");
})

app.use("/user", userRoute);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})