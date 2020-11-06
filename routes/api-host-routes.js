// const isAuthenticated = require("../config/middleware/isAuthenticated");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const passport = require("../config/passport");
const db = require("../models");

module.exports = function (app) {

    app.get("/api/host", (req,res) => {
        db.Host.findAll({
            include: [db.Booking]
        })
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });



    app.post("/api/host/search", (req,res) => {
        req.body.available = true;
        db.Host.findAll({
            attributes: ["first_name", "last_name", "email", "phone", "city","bio"],
            where: req.body
        })
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });

    //Host signup route handler
    app.post("/api/signup", (req, res) => {
        db.Host.create(req.body)
            .then(() => res.redirect(307, "/api/login"))
            .catch((err) => {
                res.status(401).json(err);
            });
    });

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.json(req.user);
    });

    // PUT route for updating host profile
    app.put("/api/profile", isAuthenticated , (req, res) => {
        db.Host.update(
            req.body,
            {
                where: {
                    id: req.user.id
                }
            }).then((results) => {
            res.json(results);
        });
    });

    app.put("/api/host", (req, res) => {
        const hostId = req.body.host_id;
        delete req.body.host_id;
        db.Host.update(
            req.body,
            {
                where: {
                    id: hostId
                }
            }).then((results) => {
            res.json(results);
        });
    });
};