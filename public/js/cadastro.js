console.log("JavaScript Carregado");

const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const date = document.getElementById("date");
const gender = document.getElementById("gender");
const password = document.getElementById("password");
const button = document.getElementById("check");

const usuario = localStorage.getItem("usuario");
const usuarioObject = JSON.parse(usuario);
const token = localStorage.getItem("token");
const tokenObject = JSON.parse(token);
console.log(tokenObject);


async function registerUsers() {
  let newUser = {
    nome: nome.value.trim(),
    email: email.value.trim(),
    senha: password.value.trim(),
  };

  const req = await fetch("https://debugrace-backend.onrender.com/usuario", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.erro) {
        const msgResult = document.querySelector("#msgResult");
        msgResult.innerHTML = res.erro;
      } else {
        msgResult.innerHTML = res.msg;
      }
      if (res.usuario.id) {
        window.location.assign("https://debugrace-30568.web.app/login");
      }
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  registerUsers();
  console.log("clicou");
});

nome.addEventListener("keyup", function () {
  if (nome.value.trim() === "") {
    alertError(nome, "Seu nome é obrigatório");
  } else {
    alertSuccess(nome);
  }
});

email.addEventListener("keyup", function () {
  if (email.value.trim() === "") {
    alertError(email, "Seu email é obrigatório");
  } else if (!checkEmail(email.value.trim())) {
    alertError(email, "Digite um email valido");
  } else {
    alertSuccess(email);
  }
});

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

password.addEventListener("keyup", function () {
  if (password.value.trim() === "") {
    alertError(password, "Sua senha é obrigatória");
  } else if (password.value.length < 8) {
    alertError(password, "Sua senha deve conter no mínimo 8 caracteres");
  } else {
    alertSuccess(password);
  }
});

function alertError(input, message) {
  const control = input.parentElement;
  const small = control.querySelector("small");

  // Adc mensagem de erro
  small.innerText = message;

  // acionar a class de erro
  control.className = "form-container error";
}

function alertSuccess(input) {
  const control = input.parentElement;
  control.className = "form-container success";
}
