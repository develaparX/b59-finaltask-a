const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function heroesPage(req, res) {
  try {
    const { user } = req.session;

    console.log(user);
    const heroes = await prisma.$queryRaw`
  SELECT h.*, t.name AS type_name
  FROM "heroes_tb" h
  JOIN "type_tb" t ON h.type_id = t.id
`;

    console.log("existing heroes", heroes);
    res.render("heroesList", { heroes, user });
  } catch (error) {
    console.log("error heroesPage,", error);
    req.flash("error", "Internal Server Error");
  }
}

async function addHeroesPage(req, res) {
  try {
    const { user } = req.session;

    const types = await prisma.type_tb.findMany();
    res.render("heroesAdd", { types, user });
  } catch (error) {
    console.log("Error Create Heroes Page", error);
    req.flash("error", "Internal Server Error");
  }
}

async function addHeroes(req, res) {
  try {
    const { user } = req.session;
    const { heroesName, heroesType, heroesDesc } = req.body;

    const type =
      await prisma.$queryRaw`SELECT * FROM "type_tb" WHERE id = ${parseInt(
        heroesType
      )}`;

    if (!type || type.length === 0) {
      console.log("Type tidak ditemukan");
      req.flash("error", "Invalid Type");
      return res.redirect("/create-heroes");
    }

    const typeId = type[0].id;
    const photo = `https://images4.alphacoders.com/937/thumb-1920-937927.jpg`;

    const result = await prisma.$queryRaw`
      INSERT INTO "heroes_tb" ("name", "type_id", "photo", "user_id", "desc")
      VALUES (${heroesName}, ${typeId}, ${photo}, ${user.id}, ${heroesDesc})
      RETURNING id, name, type_id, photo, user_id, "desc";
    `;

    if (!result || result.length === 0) {
      console.log("Gagal memasukkan data ke database");
      req.flash("error", "Gagal memasukkan data ke database");
      return res.redirect("/create-heroes");
    }

    console.log("Hero berhasil ditambahkan:", result[0]);
    req.flash("success", "Hero berhasil ditambahkan");
    res.redirect("/heroes");
  } catch (error) {
    console.error("Error Create Heroes:", error.message);
    req.flash("error", "Internal Server Error");
    res.redirect("/create-heroes");
  }
}

async function editHeroesPage(req, res) {
  try {
    const { user } = req.session;
    const id = parseInt(req.params.id, 10);

    const types = await prisma.type_tb.findMany();

    const heroes = await prisma.$queryRaw`
      SELECT "id","name","type_id","photo","user_id","desc"
      FROM "heroes_tb" 
      WHERE "id" = ${id};
    `;

    if (!heroes.length) {
      req.flash("error", "Hero not found");
      return res.redirect("/heroes");
    }

    res.render("heroesEdit", {
      heroes: heroes[0],
      user,
      types,
    });
  } catch (error) {
    console.error("Error in editHeroesPage:", error);
    req.flash("error", "Internal Server Error");
    res.status(500).redirect("/error");
  }
}

async function editHeroes(req, res) {
  try {
    console.log("Request body:", req.body);

    const id = parseInt(req.params.id, 10);
    const { heroesName, heroesType, heroesDesc } = req.body;

    console.log(parseInt(heroesType));
    if (!heroesName || !heroesType || !heroesDesc) {
      console.log("Missing data in request body");
      req.flash("error", "Missing data");
      return res.redirect("/heroes");
    }
    const type =
      await prisma.$queryRaw`SELECT * FROM "type_tb" WHERE id = ${parseInt(
        heroesType
      )}`;

    if (!type || type.length === 0) {
      console.log("Type tidak ditemukan");
      req.flash("error", "Invalid Type");
      return res.redirect("/heroes");
    }

    const typeId = type[0].id;

    console.log("type id :", typeId);
    const photo = `https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg?t=st=1736761939~exp=1736765539~hmac=f1ce486690babe87c05e2e41058b92fce80570fe97f6f0a7661e85354fa5cfb7&w=826`;

    await prisma.$executeRaw`
      UPDATE heroes_tb 
      SET name = ${heroesName},
          type_id = ${typeId},
          photo = ${photo}, 
          "desc" = ${heroesDesc}
      WHERE id = ${id}
    `;

    req.flash("success", "Hero updated successfully");
    res.redirect(`/heroes`);
  } catch (error) {
    console.error("Error in editHeroes:", error);
    req.flash("error", "Internal Server Error");
    res.status(500).redirect("/error");
  }
}

async function heroesDetailPage(req, res) {
  try {
    const { user } = req.session;
    const { id } = req.params;

    const heroes = await prisma.$queryRaw`
    SELECT h.*, t.name AS type_name, u.username,u.email
    FROM "heroes_tb" h
    JOIN "type_tb" t ON h.type_id = t.id
    JOIN "users_tb" u ON h.user_id = u.id
  `;

    console.log("berikut ini detail heroes", heroes);
    res.render("heroesDetail", { heroes: heroes[0], user });
  } catch (error) {
    console.log("errornya ini bos", error);
    req.flash("error", "internal server error");
    res.redirect("/heroes");
  }
}

async function deleteHeroes(req, res) {
  try {
    const { user } = req.session;
    const id = parseInt(req.params.id, 10); // Mengambil ID hero dari parameter URL

    // Menyaring apakah hero yang akan dihapus ada dalam database
    const hero = await prisma.$queryRaw`
      SELECT * FROM "heroes_tb" WHERE id = ${id} AND user_id = ${user.id};
    `;

    if (!hero || hero.length === 0) {
      console.log("Hero not found or unauthorized");
      req.flash("error", "Hero not found or unauthorized");
      return res.redirect("/heroes");
    }

    // Menghapus hero dari tabel heroes_tb
    await prisma.$executeRaw`
      DELETE FROM "heroes_tb" WHERE id = ${id};
    `;

    console.log("Hero deleted successfully:", hero);
    req.flash("success", "Hero deleted successfully");
    return res.redirect("/heroes");
  } catch (error) {
    console.error("Error in deleteHeroes:", error);
    req.flash("error", "Internal Server Error");
    return res.redirect("/heroes");
  }
}

module.exports = {
  heroesPage,
  addHeroesPage,
  addHeroes,
  editHeroesPage,
  editHeroes,
  deleteHeroes,
  heroesDetailPage,
};
