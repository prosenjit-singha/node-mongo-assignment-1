const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const middleware = require("../middlewares/user.middleware");

router.get("/random", controller.getARandomUser);

router.get("/all", controller.getTheAllUsers);

router.post("/save", middleware.validateObj, controller.createAnUser);

router.patch("/update", controller.updateAnUser);

router.patch("/bulk-update", controller.updateMultipleUsers);

router.delete("/delete", controller.deleteAnUser);

module.exports = router;
