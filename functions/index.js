const functions = require("firebase-functions");
const express = require("express");
const app = express();

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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
