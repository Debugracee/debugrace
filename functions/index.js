require("dotenv/config");
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("sequelize");
const usuarioRoute = require("./routers/usuario.routes");
const trilhasRoutes = require("./routers/trilhas.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "./public/"));

app.get("/pagina-inicial", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.get("/guia-estudos", (req, res) => {
  res.render("guia-estudos");
});

app.get("/quem-somos", (req, res) => {
  res.render("quem-somos");
});
app.get("/guia-estudos/ciclo-basico", (req, res) => {
  res.render("ciclo-basico");
});

app.get("/guia-estudos/back-end", (req, res) => {
  res.render("trilha-backend");
});

app.get("/guia-estudos/front-end", (req, res) => {
  res.render("trilha-frontend");
});

app.get("/configuracoes", (req, res) => {
  res.render("configuracoes");
});
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(usuarioRoute);
app.use(trilhasRoutes);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
