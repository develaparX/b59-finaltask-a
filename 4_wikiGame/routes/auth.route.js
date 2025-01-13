const express = require("express");
const {
  authRegister,
  registerPage,
  loginPage,
  authLogin,
  homePage,
  authLogout,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", homePage);

// Routes terkait autentikasi
router.get("/register", registerPage);
router.post("/register", authRegister);

router.get("/login", loginPage);
router.post("/login", authLogin);

router.get("/logout", authLogout);

module.exports = router;
