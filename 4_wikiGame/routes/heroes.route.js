const express = require("express");
const {
  heroesPage,
  addHeroesPage,
  addHeroes,
  editHeroesPage,
  editHeroes,
  deleteHeroes,
  heroesDetailPage,
} = require("../controllers/heroes.controller");
const {
  addTypePage,
  addType,
  typeList,
  deleteType,
} = require("../controllers/type.controller");

const router = express.Router();

// Routes terkait autentikasi
router.get("/heroes", heroesPage);
router.get("/create-heroes", addHeroesPage);
router.post("/heroes", addHeroes);
router.get("/heroes/:id", heroesDetailPage);

router.get("/edit-heroes/:id", editHeroesPage);
router.post("/update-heroes/:id", editHeroes);

router.get("/:id/delete", deleteHeroes);
router.get("/type-delete/:id", deleteType);

// Type Routes
router.get("/type", typeList);
router.get("/create-type", addTypePage);
router.post("/create-type", addType);

module.exports = router;
