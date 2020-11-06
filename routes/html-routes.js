// Requiring our custom middleware for checking if a user is logged in
// eslint-disable-next-line no-unused-vars
/* eslint-disable camelcase */
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const { Op } = require("sequelize");

module.exports = function(app) {
    // Landing Page - Search Form 
    app.get("/", (req, res) => {
    // If the hosts already has an account send host to host-profile page
        if (req.user) {
            req.logout();
            res.render("index");
        }
        res.render("index");
    });

    //Signup Form 
    app.get("/signup", (req, res) => {
        if (req.user) {
            res.render("profile");
        }
        res.render("signup");
    });

    //Login Form
    app.get("/login", (req, res) => {
        if (req.user) {
            res.render("profile");
        }
        res.render("login");
    });

    // Edit Host Profile Form
    app.get("/account", (req, res) => {
        if (req.user) {
            res.render("account");
        }
        res.render("index");
    });

    //Render Host Profile Page
    app.get("/profile", isAuthenticated, (req,res) => {
        db.Host.findOne({
            where: {
                id: req.user.id,
            },
            attributes: [
                "first_name", 
                "last_name", 
                "email", 
                "phone", 
                "city",
                "bio",
                "is_pup",
                "is_cat",
                "rate",
                "short_term",
                "long_term",
                "pet_amt",
                "small",
                "med",
                "large",
                "giant",
                "available"
            ],
            include: [db.Booking]
        })
            .then((results) => {
                res.render("profile", {host: results.dataValues});
            })
            .catch(error => console.log(error));
    });

    // Render Search Result Page
    app.get("/result", (req,res) => {
    
        const filteredReq = {};
        for (const [key, value] of Object.entries(req.query)) {
            if(value === "true") { 
                filteredReq[key] = true;
            }
        }

        // const {is_pup, is_cat, short_term, long_term, pet_amt, rate, small, med, large, giant} = req.query;
        const {pet_amt, rate, city} = req.query;

        db.Host.findAll({
            attributes: ["id","first_name", "last_name", "email", "phone", "city","bio"],
            where: {
                ...filteredReq,
                available: true,
                city: city,
                rate: {
                    [Op.lte]: rate,
                },
                pet_amt: {
                    [Op.gte]: pet_amt,
                },
            },
            order: [["createdAt", "DESC"]]
        })
            .then(results => {
                res.render("result",{data: results, searchCity: city});
            })
            .catch(error => console.log(error));
    });

    // Route for logging host out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};
