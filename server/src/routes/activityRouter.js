const {Router} = require("express");
const {getActivitiesHandler,
    postActivitiesHandler
} = require("../handlers/activitiesHandlers");

const activityRouter = Router();

activityRouter.get("/",getActivitiesHandler);// trea un arreglo de objetos donde cada obj es una actividad

activityRouter.post("/",postActivitiesHandler);// crea una nueva actividad 

module.exports = activityRouter;