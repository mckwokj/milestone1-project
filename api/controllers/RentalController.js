/**
 * RentalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // create function
    create: async function (req, res) {
        if (req.method == "GET")
            return res.view('rental/create');

        if (!req.body.Rental)
            return res.badRequest("Form-data not received.");

        await Rental.create(req.body.Rental);

        return res.view('rental/create', { msg: "Submitted already" }); // If submitted, it will show the message indicating the end process
    },

    // json function
    json: async function (req, res) {

        var estate = await Rental.find();

        return res.json(estate);
    },

    // index: async function(req, res){
    //     var models = await Rental.find();
    //     return res.view('rental/index', { persons: models });
    // }

    admin: async function (req, res) {

        var models = await Rental.find();

        if (req.method == "GET")
            return res.view('rental/admin', { apartments: models });

    },

    search: async function (req, res) {
        if (req.method == "GET")
            return res.view('rental/search');

    },

};

