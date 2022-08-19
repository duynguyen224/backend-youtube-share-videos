const authController = require("../controllers/AuthController");
const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.refreshToken);

module.exports = router;
