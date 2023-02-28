const express = require("express");
const userController = require("../controllers/user-controller");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", isAuth, userController.getUser);

module.exports = router;
