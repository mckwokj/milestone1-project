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

        //return res.view('rental/create', { msg: "Submitted already" }); // If submitted, it will show the message indicating the end process
        return res.view('rental/create');
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

        if (req.method == "GET") {
            return res.view('rental/admin', { apartments: models });
        }
    },

    search: async function (req, res) {
        if (req.method == "GET")
            return res.view('rental/search');

    },

    edit: async function (req, res) {

        if (req.method == "GET") {

            var model = await Rental.findOne(req.params.id);

            if (!model) return res.notFound();
            
            return res.view('rental/edit', { apartment: model });

        } else {

            if (!req.body.Rental)
                return res.badRequest("Form-data not received.");

            var models = await Rental.update(req.params.id).set({
                title: req.body.Rental.title,
                url: req.body.Rental.url,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },

};

