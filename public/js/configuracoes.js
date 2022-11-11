console.log("carregou");
const mudarNome = document.getElementById("nome");
const mudarEmail = document.getElementById("email");
const mudarSenha = document.getElementById("password");
const btnNome = document.getElementById("btnNome");
const btnEmail = document.getElementById("btnEmail");
const btnSenha = document.getElementById("btnSenha");
const btnSave = document.getElementById("btnSalvar");
const btnDelete = document.getElementById("btnDelete");
const deleteUser = document.getElementById("delete");

const containerModal = document.getElementById("container-modal");
const modal = document.getElementById("modal");
const cancelAction = document.querySelector(".btnCancel");
const x = document.getElementById("x");
console.log("lalalalala");
// funcao ativar modal deletar usuario
const activeModal = () => {
  modal.classList.toggle("active");
  containerModal.classList.toggle("active");
};

const disableModal = () => {
  modal.classList.remove("active");
  containerModal.classList.remove("active");
};

btnNome.addEventListener("click", () => {
  mudarNome.removeAttribute("disabled");
});
btnEmail.addEventListener("click", () => {
  mudarEmail.removeAttribute("disabled");
});

btnSenha.addEventListener("click", () => {
  mudarSenha.removeAttribute("disabled");
});

const usuario = localStorage.getItem("usuario");
const token = localStorage.getItem("token");
const usuarioObject = JSON.parse(usuario);
const tokenObject = JSON.parse(token);
console.log(tokenObject);

if (!usuarioObject || !tokenObject) {
  window.location.assign("https://debugrace-30568.web.app/login");
} else {
  fetch("https://debugrace-backend.onrender.com/status", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: usuarioObject.email,
    }),
  })
    // || usuarioAlteradoObject.email,
    .then((res) => res.json())
    .then((res) => {
      const logado = res.statusLogado;
      const status = logado.statusLogin;
      console.log(status);
      if (!status && tokenObject === null) {
        window.location.assign("https://debugrace-30568.web.app/login");
        // colocar a estilizacao "normal aqui" -> carregar modal
      } else {
        // transformar isso me funcao(talvez) por se repetir mt no site
        console.log(logado);
        const configElement = document.querySelector("#item1");
        const logoutButton = document.querySelector("#item2");

        configElement.innerHTML = "CONFIGURAÇÕES";
        configElement.href = "/configuracoes";

        logoutButton.innerHTML = "SAIR";
        logoutButton.removeAttribute("href");
        logoutButton.addEventListener("click", () => {
          localStorage.removeItem("token");
          fetch("https://debugrace-backend.onrender.com/deslog", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: usuarioObject.email }),
          }).then((res) => res.json());
          localStorage.removeItem("usuario");
          window.location.assign("https://debugrace-30568.web.app/login");
        });
        // editar estilização das tags (usuario logado)

        // mudarNome.value = usuarioObject.nome;
        // mudarEmail.value = usuarioObject.email;
        // // mudarNascimento.value = usuarioObject.nascimento
        // mudarGenero.value = usuarioObject.genero;
      }
    });
}

btnDelete.addEventListener("click", () => {
  console.log("ta pegando trouxa");
  activeModal();
  containerModal.addEventListener("click", (e) => {
    const elementRemoveModal = e.target.classList[0];
    const classRemoveModal = ["container-modal", "btnCancel", "x"];
    const closeModal = classRemoveModal.some(
      (classRemoveModal) => classRemoveModal === elementRemoveModal
    );
    console.log(elementRemoveModal);
    if (closeModal) {
      disableModal();
    }
  });

  deleteUser.addEventListener("click", () => {
    fetch(
      `https://debugrace-backend.onrender.com/usuario/${usuarioObject.id}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    ).then((res) => res.json());
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.assign("https://debugrace-30568.web.app/cadastro");
  });
  // quando clicar no botao chamar o modal
  // nele vai ter a opcao de cancelar e excluir
  // quando clicar em "dizer adeus", fazer o fetch

  // por enquanto deixar assim, mas pretendo colocar mensagem avisando que o usuario foi excluido
});

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`https://debugrace-backend.onrender.com/usuario/${usuarioObject.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${tokenObject}`,
    },
    body: JSON.stringify({
      nome: mudarNome.value.trim(),
      email: mudarEmail.value.trim(),
      senha: mudarSenha.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.erro) {
        const msgResult = document.querySelector("#msgResult");
        msgResult.innerHTML = res.erro;
      }
      const usuarioAtualizado = res.usuarioAlterado;
      msgResult.innerHTML = res.msg;
      console.log(usuarioAtualizado);
    });
  // .then((res) => {
  //   const usuarioAtualizado = res.usuarioAlterado;
  //   console.log(usuarioAtualizado)
  //   // mensagem dizendo para o usuario que as alteracoes foram salvas
  // });

  // quando altera o usuario, é preciso carregar um novo storage
  // alterar a lógiac das outras páginas para carregar quando tiver um usuario ou um usuario alterado
  // fazer validacao onde se nao houver token, ele vai chamar a rota de deslog
  // pego o storage do usuario e colocar cada atributo do usuario atual dentro dele
  // localstorage.nome = usuarioAtualizado.nome -- sla acho que da bom(seguir essa logica)

  // criar um js para o modal e exportar a funcao para ativar ele e desativar
});
