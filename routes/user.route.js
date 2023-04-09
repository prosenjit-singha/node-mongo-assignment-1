const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/user/random", controller.getARandomUser);

router.get("/user/all", controller.getTheAllUsers);

router.put("/user/save", controller.createAnUser);

router.patch("/user/update", controller.updateAnUser);

router.patch("/user/bulk-update", controller.updateMultipleUsers);

router.delete("/user/delete", controller.deleteAnUser);
