const controller = require("../controllers/controller");
const router = require("express").Router();

module.exports = (app) => {
  // get the number of cases
  router.get("/infected", controller.getInfected);

  // get the number of cases based on cities
  router.get("/city-data", controller.getCityInfected);

  // get the latest news from the CDC
  router.get("/news", controller.getNews);

  app.use("/", router);
};
