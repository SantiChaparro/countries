const {Activity,Country} = require("../db");


const getAllActivities = async() => await Activity.findAll({

    include:{
        model: Country,
        attributes:["nombre"],
        through:{
            attributes: [],
        },
    },

});



const createActivity = async(nombre,dificultad,duracion,temporada,paises) => {

    const newActivity = await Activity.create({nombre,dificultad,duracion,temporada});

    newActivity.addCountries(paises);
    return newActivity;
};


module.exports = {
    createActivity,
    getAllActivities
}