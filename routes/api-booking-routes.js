const db = require("../models");

module.exports = function (app) {

    app.post("/booking", (req, res) => {
        db.Booking.create(req.body)
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });

    app.put("/booking", (req,res) => {
        db.Booking.update(req.body)
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });

    app.get("/booking", (req,res) => {
        db.Booking.findAll({
            include: [db.Host]
        })
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });
};