console.log("carregou");
const form = document.querySelector("#formLogin");
const usuario = localStorage.getItem("usuario");
const usuarioObject = JSON.parse(usuario);
const token = localStorage.getItem("token");
const tokenObject = JSON.parse(token);
console.log(tokenObject);

// fetch("https://debugrace-backend.onrender.com/status", {
//   method: "POST",
//   headers: { "Content-type": "application/json" },
//   body: JSON.stringify({ email: usuarioObject.email }),
// })
//   .then((res) => res.json())
//   .then((res) => {
//     const logado = res.statusLogado;
//     const status = logado.statusLogin;
//     console.log(status);
//     if (!status || !tokenObject) {
//       window.location.assign("https://debugrace-30568.web.app/login");
//     } else {
//       console.log(logado);
//       const configElement = document.querySelector("#item1");
//       const logoutButton = document.querySelector("#item2");

//       configElement.innerHTML = "CONFIGURAÇÕES";
//       configElement.href = "/configuracoes";
//       logoutButton.innerHTML = "SAIR";
//       logoutButton.removeAttribute("href");
//       logoutButton.addEventListener("click", () => {
//         localStorage.removeItem("token");
//         fetch("https://debugrace-backend.onrender.com/deslog", {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify({ email: usuarioObject.email }),
//         }).then((res) => res.json());
//         localStorage.removeItem("usuario");
//         window.location.assign("https://debugrace-30568.web.app/login");
//       });
//     }
//   });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loginUsuario();
  console.log("clicou");
});

async function loginUsuario() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const user = {
    email: email.value.trim(),
    senha: password.value.trim(),
  };

  await fetch("https://debugrace-backend.onrender.com/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.erro) {
        const msgResult = document.querySelector("#msgResult");
        msgResult.innerHTML = res.erro;
      } else {
        msgResult.innerHTML = res.msg;
      }

      const usuario = res.usuario;
      const token = res.token;
      console.log(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", JSON.stringify(token));
      console.log(usuario.id);
      if (usuario.id && token) {
        window.location.assign("https://debugrace-30568.web.app/guia-estudos");
      }
    });
}

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
