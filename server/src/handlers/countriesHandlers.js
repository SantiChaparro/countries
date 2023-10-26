const {getCountryBYName,getAllCountries,getCountryByPk,getTotalCountries} = require("../controllers/countriesControllers");

const getCountries = async(req,res) => {

    const {nombre,_start,_end} = req.query;
    const startIndex = parseInt(_start);
    const endIndex = parseInt(_end);

    try {
        
       
        if(nombre) {
            const searchedCountry = await getCountryBYName(nombre);
            res.status(200).json(searchedCountry);
        }
        else if(!startIndex && !endIndex){
             const searchedCountry = await getTotalCountries();
            
            res.status(200).json(searchedCountry);
        }else{
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