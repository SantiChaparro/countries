const {createActivity,getAllActivities} = require("../controllers/activitiesControllers");

const getActivitiesHandler = async(req,res) => {
   try {
    const allActivities =await getAllActivities();
    res.status(200).json(allActivities);
   } catch (error) {
    res.status(400).json({error: error.message})
   }
};

const postActivitiesHandler = async(req,res) => {
   //console.log(req.body)
   const {nombre,dificultad,duracion,temporada,paises} = req.body;
   try {
      //console.log(req.body)
    
   // console.log(paises)
   // console.log(nombre)
    const newActivity = await createActivity(nombre,dificultad,duracion,temporada,paises);
   //console.log(newActivity)
    res.status(201).json(newActivity);
   // console.log(newActivity)

   } catch (error) {
        res.status(400).json({error:"handleractivities"+ error.message});
   }

};

module.exports = {
    getActivitiesHandler,
    postActivitiesHandler
}