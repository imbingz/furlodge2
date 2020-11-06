//Import dotenv package - DON'T MOVE THIS - MUST BE ON THE VERY TOP
require("dotenv").config();

// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3008;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use sessions to keep track of our user"s login status
app.use(session({ secret: "secret words", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//set handlebars - extname: '.hbs' inside exphbs
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// Requiring routes
require("./routes/html-routes.js")(app);
require("./routes/api-host-routes.js")(app);
require("./routes/api-booking-routes.js")(app);

// Syncing our database and logging a message to the user upon success
//Make sure to take {force: true} out 
// db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
		  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	  });
});


