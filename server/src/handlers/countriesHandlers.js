const {getCountryBYName,getAllCountries,getCountryByPk} = require("../controllers/countriesControllers");

const getCountries = async(req,res) => {
    try {
        const {nombre,_start,_end} = req.query;
        const startIndex = parseInt(_start);
        const endIndex = parseInt(_end);
       
        if(nombre) {
            const searchedCountry = await getCountryBYName(nombre);
            res.status(200).json(searchedCountry);
        }
        else {
            const searchedCountry = await getAllCountries(startIndex,endIndex);
            res.status(200).json(searchedCountry);
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

const getCountriesById = async(req,res) => { 
   try {

    const {id} = req.params;
    const searchedCountry = await getCountryByPk(id);
    res.status(200).json(searchedCountry);

   } catch (error) {
    
    res.status(400).json({error: error.message});

   }
};



module.exports = {
    getCountries,
    getCountriesById
}