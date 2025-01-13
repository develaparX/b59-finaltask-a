const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addTypePage(req, res) {
  try {
    res.render("heroesType");
  } catch (error) {
    req.flash("error", "error heroesType");
  }
}

async function addType(req, res) {
  try {
    const { name, typeDesc } = req.body;

    const type =
      await prisma.$executeRaw`INSERT INTO "type_tb" ("name","desc") VALUES (${name},${typeDesc}) RETURNING id, name,"desc"`;

    console.log("Type berhasil ditambahkan", type);

    req.flash("success", "type berhasil ditambahkan");
    res.redirect("/heroes");
  } catch (error) {
    req.flash("error", "Internal server Error");
    res.redirect("/heroes");
  }
}

async function typeList(req, res) {
  try {
    const { user } = req.session;

    const types = await prisma.$queryRaw`SELECT * FROM type_tb`;

    console.log("isi types", types);

    res.render("typeList", { types, user });
  } catch (error) {
    req.flash("error", "Internal Server Error");
    res.redirect("/");
  }
}

async function deleteType(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    const type = await prisma.$queryRaw`
      SELECT * FROM "type_tb" WHERE id = ${id};
    `;

    if (!type || type.length === 0) {
      console.log("Hero not found or unauthorized");
      req.flash("error", "Hero not found or unauthorized");
      return res.redirect("/type");
    }

    await prisma.$executeRaw`
      DELETE FROM "type_tb" WHERE id = ${id};
    `;

    console.log("Type deleted successfully:", type);
    req.flash("success", "Type deleted successfully");
    return res.redirect("/type");
  } catch (error) {
    console.error("Error in deleteHeroes:", error);
    req.flash("error", "Internal Server Error");
    return res.redirect("/type");
  }
}

module.exports = { addTypePage, addType, typeList, deleteType };
