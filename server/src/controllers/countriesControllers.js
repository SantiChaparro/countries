const {Country,Activity} = require("../db");
const {Op} = require("sequelize");

const getCountryBYName = async(name) => {
   const queryCountry = await Country.findAll(
        {
            where:{
                nombre:{
                    [Op.iLike]: `%${name}%`
                }
            }
        }
    )
    if(queryCountry.length > 0){
        console.log(queryCountry)
        return queryCountry;
    }else{
        throw new Error("No existe dicho pais");
    }
}





const getAllCountries = async(startIndex,endIndex) =>{

   const pageCountries = await Country.findAll(
    
        {
            include: {
                model: Activity,
                attributes: ["nombre"],
                through:{
                    attributes: [],
                }
    
            },
            offset: startIndex,
            limit: endIndex - startIndex,
        
        },
        
        
    );
    return pageCountries;


} 

const getCountryByPk = async(id) => {
    console.log(id)
    const country = await Country.findByPk(id,

        {
            include: {
                model: Activity,
                attributes: ["nombre"],
                through:{
                    attributes: [],
                }

            }
        
        });

    if(country){
        console.log(country)
        return country
    }else{
        throw new Error("Pais no encontrado")
    }
};


/*
const getCountryByPk = async(id) => {
    
    const country = await Country.findByPk(id,{includes: Activity.name});

    if(country){
        return country
    }else{
        throw new Error("Pais no encontrado")
    }
};



*/

module.exports = {
    getCountryBYName,
    getAllCountries,
    getCountryByPk

}

//copia de seguridad de funcion getallcountries
/*
const getAllCountries = async() => await Country.findAll(
    
    {
        include: {
            model: Activity,
            attributes: ["nombre"],
            through:{
                attributes: [],
            }

        }
    
    },
    
    
);

*/