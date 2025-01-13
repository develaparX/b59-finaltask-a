const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs");
const path = require("path");
const helpers = require("./utils/helpers");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views/pages"));
hbs.registerPartials(__dirname + "/views/partials");

helpers.registerHelpers(hbs);

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const allUsers = await prisma.users_tb.findMany();
  console.log(allUsers);
  res.render("homepage");
});

app.get("/heroes", async (req, res) => {
  res.render("heroesList");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.get("/create-heroes", async (req, res) => {
  res.render("heroesAdd");
});

app.get("/create-type", async (req, res) => {
  res.render("heroesType");
});

app.get("/edit-heroes", async (req, res) => {
  res.render("heroesEdit");
});

app.get("/create-type", async (req, res) => {
  res.render("heroesType");
});

app.post("/users", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const result =
      await prisma.$executeRaw`INSERT INTO "users_tb" ("email","username","password") VALUES (${email},${username},${password}) RETURNING *`;

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating user" });
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
