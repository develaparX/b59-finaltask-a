const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const saltRounds = 10;

function homePage(req, res) {
  const { user } = req.session;

  console.log(user);
  res.render("homepage", { user });
}

async function registerPage(req, res) {
  const { user } = req.session;
  if (user) {
    req.flash("error", "User already login");
    return res.redirect("/");
  }

  res.render("register");
}

async function authRegister(req, res) {
  try {
    const { username, email, password } = req.body;

    console.log(req.body);
    const existingUser =
      await prisma.$queryRaw`SELECT * FROM "users_tb" WHERE email = ${email}`;

    if (existingUser.length) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result =
      await prisma.$executeRaw`INSERT INTO "users_tb" ("email","username","password") VALUES (${email},${username},${hashedPassword}) RETURNING ("username","email","password")`;

    console.log("berhasil register:", result);
    res.redirect("/login");
  } catch (error) {
    res.status(500).json(error);
  }
}

function loginPage(req, res) {
  try {
    const { user } = req.session;
    if (user) {
      req.flash("error", "User already login");
      return res.redirect("/");
    }
    res.render("login");
  } catch (error) {}
}

async function authLogin(req, res) {
  try {
    const { email, password } = req.body;

    console.log("request Login =", req.body);

    const [user] =
      await prisma.$queryRaw`SELECT * FROM "users_tb" WHERE email = ${email}`;
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }
    const isValidated = await bcrypt.compare(password, user.password);
    if (!isValidated) {
      res.status(400).json({ message: "password salah" });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    req.flash("success", "Login Berhasil");
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json(error);
  }
}
function authLogout(req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error saat menghapus sesi:", err);
        return res
          .status(500)
          .json({ message: "Gagal logout. Silakan coba lagi." });
      }

      res.clearCookie("connect.sid");

      res.redirect("/login");
    });
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  authRegister,
  registerPage,
  loginPage,
  authLogin,
  homePage,
  authLogout,
};
