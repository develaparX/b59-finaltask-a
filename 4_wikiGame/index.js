const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hbs = require("hbs");
const path = require("path");
const helpers = require("./utils/helpers");
const flash = require("connect-flash");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const authRoutes = require("./routes/auth.route.js");
const heroesRoutes = require("./routes/heroes.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/utils", express.static(path.join(__dirname, "./utils")));

app.use(
  session({
    store: new pgSession({
      connectionString: process.env.DATABASE_URL,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views/pages"));
hbs.registerPartials(__dirname + "/views/partials");

helpers.registerHelpers(hbs);

app.use(authRoutes);
app.use(heroesRoutes);

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  testDatabaseConnection();
  console.log(`Server running on port ${PORT}`);
});
