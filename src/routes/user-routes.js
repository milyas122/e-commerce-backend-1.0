const express = require("express");
const userController = require("../controllers/user-controller");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", isAuth, userController.getUser);
router.put("/users/:id", isAuth, userController.updateProfile);

module.exports = router;
