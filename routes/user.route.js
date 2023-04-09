const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

router.get("/random", controller.getARandomUser);

router.get("/all", controller.getTheAllUsers);

router.post(
  "/save",
  userMiddleware.validateUserType,
  userMiddleware.validateObjectKeys,
  controller.createAnUser
);

router.patch(
  "/update",
  userMiddleware.validateUserType,
  controller.updateAnUser
);

router.patch("/bulk-update", controller.updateMultipleUsers);

router.delete(
  "/delete",
  userMiddleware.validateUserType,
  controller.deleteAnUser
);

module.exports = router;
