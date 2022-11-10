document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario");
  const usuarioObject = JSON.parse(usuario);
  const token = localStorage.getItem("token");
  const tokenObject = JSON.parse(token);
  console.log(tokenObject);
  
  fetch("https://debugrace-backend.onrender.com/status", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email: usuarioObject.email }),
  })
    .then((res) => res.json())
    .then((res) => {
      const logado = res.statusLogado;
      const status = logado.statusLogin;
      console.log(status);
      if (!status || !tokenObject) {
        window.location.assign("https://debugrace-30568.web.app/pagina-inicial");
      } else {
        console.log(logado);
        const configElement = document.querySelector("#item1");
        const logoutButton = document.querySelector("#item2");

        configElement.innerHTML = "CONFIGURAÇÕES";
        configElement.href = "/configuracoes";
        logoutButton.innerHTML = "SAIR";
        logoutButton.removeAttribute("href");
        logoutButton.addEventListener("click", () => {
          localStorage.removeItem("token")
          fetch("https://debugrace-backend.onrender.com/deslog", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: usuarioObject.email }),
          }).then((res) => res.json());
          localStorage.removeItem("usuario");
          window.location.assign("https://debugrace-30568.web.app/login");
        });
      }
    });
});

// const btnMobile = document.getElementById("btn-mobile");
// function toggleMenu(event) {
//     if(event.type === 'touchstart') event.preventDefault()
    
//     const navbar = document.getElementById("navbar");
//     navbar.classList.toggle('active');
//     const active = nav.classList.contains('active')

//     event.currentTarget.setAttribute('aria-expanded', active);
//     if(active){ 
//         event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
//     }else{
//         event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
//     }
// };
// btnMobile.addEventListener('click', toggleMenu);
// btnMobile.addEventListener('touchstart', toggleMenu);
