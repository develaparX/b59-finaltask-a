const express = require("express");
const { PrismaClient } = require("@prisma/client");
const hbs = require("hbs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));
// hbs.registerPartials(__dirname + "/views/partials");

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const allUsers = await prisma.users_tb.findMany();
  console.log(allUsers);
  res.render("demo");
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
