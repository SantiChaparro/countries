const { Router } = require("express");
const {getCountries,getCountriesById} = require("../handlers/countriesHandlers");


const countriesRouter = Router();

countriesRouter.get("/",getCountries);

countriesRouter.get("/:id",getCountriesById);


module.exports = countriesRouter;