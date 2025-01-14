const express = require("express");
const upload = require("../middlewares/upload-files");
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
  editTypePage,
  editType,
} = require("../controllers/type.controller");

const router = express.Router();

// Routes terkait autentikasi
router.get("/heroes", heroesPage);
router.get("/create-heroes", addHeroesPage);
router.post("/heroes", upload.single("heroesPhoto"), addHeroes);
router.get("/heroes/:id", heroesDetailPage);

router.get("/edit-heroes/:id", editHeroesPage);
router.post("/update-heroes/:id", upload.single("heroesPhoto"), editHeroes);

router.get("/:id/delete", deleteHeroes);
router.get("/type-delete/:id", deleteType);

// Type Routes
router.get("/type", typeList);
router.get("/create-type", addTypePage);
router.post("/create-type", addType);

router.get("/edit-type/:id", editTypePage);
router.post("/update-type/:id", editType);

module.exports = router;
