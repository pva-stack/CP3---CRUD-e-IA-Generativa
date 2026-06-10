let jogos = [
    "Minecraft",
    "Valorant",
    "Rocket League"
];

function renderizarLista() {
    const lista = document.getElementById("listaJogos");

    lista.innerHTML = "";

    for (let i = 0; i < jogos.length; i++) {

        lista.innerHTML += `
            <li>
                ${jogos[i]}
                <div>
                    <button onclick="editarItem(${i})">
                        Editar
                    </button>

                    <button onclick="removerItem(${i})">
                        Excluir
                    </button>
                </div>
            </li>
        `;
    }
}

function fazerLogin() {

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro-login");

    erro.textContent = "";

    if (usuario === "" || senha === "") {
        erro.textContent = "Preencha todos os campos.";
        erro.className = "erro";
        return;
    }

    if (usuario === "aluno" && senha === "fiap2025") {

        document.getElementById("login-container").style.display = "none";

        document.getElementById("app-container").style.display = "block";

        renderizarLista();

    } else {
        erro.textContent = "Usuário ou senha inválidos.";
        erro.className = "erro";
    }
}

function adicionarFim() {

    const campo = document.getElementById("novoJogo");
    const erro = document.getElementById("erro-item");

    if (campo.value.trim() === "") {
        erro.textContent = "Digite um jogo.";
        erro.className = "erro";
        return;
    }

    jogos.push(campo.value);

    campo.value = "";
    erro.textContent = "";

    renderizarLista();
}

function adicionarInicio() {

    const campo = document.getElementById("novoJogo");
    const erro = document.getElementById("erro-item");

    if (campo.value.trim() === "") {
        erro.textContent = "Digite um jogo.";
        erro.className = "erro";
        return;
    }

    jogos.unshift(campo.value);

    campo.value = "";
    erro.textContent = "";

    renderizarLista();
}

function editarItem(indice) {

    const novoNome = prompt(
        "Digite o novo nome:",
        jogos[indice]
    );

    if (novoNome === null) {
        return;
    }

    if (novoNome.trim() === "") {
        return;
    }

    jogos[indice] = novoNome;

    renderizarLista();
}

function removerItem(indice) {

    jogos.splice(indice, 1);

    renderizarLista();
}