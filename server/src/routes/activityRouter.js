const {Router} = require("express");
const {getActivitiesHandler,
    postActivitiesHandler
} = require("../handlers/activitiesHandlers");

const activityRouter = Router();

activityRouter.get("/",getActivitiesHandler);

activityRouter.post("/",postActivitiesHandler);

module.exports = activityRouter;