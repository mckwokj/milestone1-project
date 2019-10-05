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
            return res.view('rental/create', { msg: "" });

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

    index: async function (req, res) {
        var models = await Rental.find();
        return res.view('rental/index', { apartments: models });
    },

    admin: async function (req, res) {

        var models = await Rental.find();

        var numOfApartments = await Rental.count();

        if (req.method == "GET") {
            return res.view('rental/admin', { apartments: models, count: numOfApartments, msg: "" });
        }
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
                estate: req.body.Rental.estate,
                bedrooms: req.body.Rental.bedrooms,
                area: req.body.Rental.area,
                tenants: req.body.Rental.tenants,
                rent: req.body.Rental.rent,
                highlight: req.body.Rental.highlight || "", // return"" when checkbox is not checked
            }).fetch();

            if (models.length == 0) return res.notFound();

            var models = await Rental.find();

            var numOfApartments = await Rental.count();

            return res.view('rental/admin', { apartments: models, count: numOfApartments, msg: "Record Updated" });

        }
    },

    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Rental.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        var model = await Rental.find();

        var numOfApartments = await Rental.count();

        return res.view('rental/admin', { apartments: model, count: numOfApartments });

    },

    paginate: async function (req, res) {
        const qPage = Math.max(req.query.page - 1, 0) || 0;

        const numOfItemsPerPage = 2;

        var models = await Rental.find({
            limit: numOfItemsPerPage,
            skip: numOfItemsPerPage * qPage
        });

        var numOfPage = Math.ceil(await Rental.count() / numOfItemsPerPage);

        return res.view('rental/paginate', { apartments: models, count: numOfPage });
    },

};

