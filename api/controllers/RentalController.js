/**
 * RentalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        if (req.method == "GET")
            return res.view('rental/create');

        if (!req.body.Rental)
            return res.badRequest("Form-data not received.");

        await Rental.create(req.body.Rental);

        return res.ok("Successfully created!");
    },

};

