// --- DECLARAÇÃO DE VARIÁVEIS GLOBAIS ---
// Array de strings contendo estritamente os dados iniciais exigidos
var listaProjetos = [
    "Aplicativo de Pomodoro Personalizado",
    "E-commerce de Plantas Internas",
    "API Rest de Receitas Saudáveis"
];

// --- FUNÇÃO INICIAL DE RENDERIZAÇÃO ---
// Executada ao carregar o script para exibir o estado inicial
renderizarLista();

// --- FUNÇÕES DE AUTENTICAÇÃO ---

function executarLogin() {
    var campoUsuario = document.getElementById("usuario").value.trim();
    var campoSenha = document.getElementById("senha").value;
    var divErro = document.getElementById("erro-login");

    // Limpa erro anterior
    divErro.classList.add("oculto");
    divErro.innerText = "";

    // Validação de campos vazios
    if (campoUsuario === "" || campoSenha === "") {
        divErro.innerText = "Erro: Usuário e senha não podem ser enviados vazios.";
        divErro.classList.remove("oculto");
        return;
    }

    // Validação das credenciais exigidas
    if (campoUsuario === "aluno" && campoSenha === "fiap2025") {
        document.getElementById("tela-login").classList.add("oculto");
        document.getElementById("tela-sistema").classList.remove("oculto");
        // Limpa os campos de login para segurança
        document.getElementById("usuario").value = "";
        document.getElementById("senha").value = "";
    } else {
        divErro.innerText = "Erro: Usuário ou senha incorretos.";
        divErro.classList.remove("oculto");
    }
}

function executarLogout() {
    document.getElementById("tela-sistema").classList.add("oculto");
    document.getElementById("tela-login").classList.remove("oculto");
    // Limpa qualquer mensagem de erro do CRUD ao sair
    limparErroCrud();
}

// --- FUNÇÕES DO CRUD (LÓGICA) ---

function renderizarLista() {
    var ul = document.getElementById("lista-itens");
    ul.innerHTML = ""; // Limpa a tela antes de redesenhar

    // Percorre o array usando a posição (index) para garantir exclusividade visual e funcional
    for (var i = 0; i < listaProjetos.length; i++) {
        var li = document.createElement("li");
        
        // Texto do item
        var textoSpan = document.createElement("span");
        textoSpan.innerText = listaProjetos[i];
        li.appendChild(textoSpan);

        // Container de botões de ação do item
        var divAcoes = document.createElement("div");
        divAcoes.className = "acoes-item";

        // Botão Editar (passando o index)
        var btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn-editar";
        btnEditar.setAttribute("onclick", "editarItem(" + i + ")");
        divAcoes.appendChild(btnEditar);

        // Botão Remover (passando o index para evitar remover duplicados por texto)
        var btnRemover = document.createElement("button");
        btnRemover.innerText = "Remover";
        btnRemover.className = "btn-deletar";
        btnRemover.setAttribute("onclick", "removerItem(" + i + ")");
        divAcoes.appendChild(btnRemover);

        li.appendChild(divAcoes);
        ul.appendChild(li);
    }
}

function adicionarNoInicio() {
    limparErroCrud();
    var inputItem = document.getElementById("novo-item");
    var valor = inputItem.value.trim();

    if (validarItemVazio(valor)) {
        listaProjetos.unshift(valor); // Adiciona no começo do array
        inputItem.value = ""; // Limpa input
        renderizarLista(); // Atualiza a tela
    }
}

function adicionarNoFinal() {
    limparErroCrud();
    var inputItem = document.getElementById("novo-item");
    var valor = inputItem.value.trim();

    if (validarItemVazio(valor)) {
        listaProjetos.push(valor); // Adiciona no fim do array
        inputItem.value = ""; // Limpa input
        renderizarLista(); // Atualiza a tela
    }
}

function editarItem(posicao) {
    limparErroCrud();
    var itemOriginal = listaProjetos[posicao];
    var novoValor = prompt("Edite sua ideia de projeto:", itemOriginal);

    // Se o usuário cancelar (null) ou confirmar com o campo vazio (após trim), mantém o original
    if (novoValor === null) {
        return; // Operação cancelada, nada acontece
    }

    novoValor = novoValor.trim();

    if (novoValor === "") {
        exibirErroCrud("Erro: O item não pode ser editado para um valor vazio. Alteração descartada.");
        return; // Mantém o original intacto na lista
    }

    // Atualiza o array na posição correta e renderiza
    listaProjetos[posicao] = novoValor;
    renderizarLista();
}

function removerItem(posicao) {
    limparErroCrud();
    // Remove o item baseado estritamente na sua posição (index)
    listaProjetos.splice(posicao, 1);
    renderizarLista();
}

// --- FUNÇÕES AUXILIARES DE VALIDAÇÃO ---

function validarItemVazio(valor) {
    if (valor === "") {
        exibirErroCrud("Erro: Não é possível adicionar um item com o campo vazio.");
        return false;
    }
    return true;
}

function exibirErroCrud(mensagem) {
    var divErro = document.getElementById("erro-crud");
    divErro.innerText = mensaje || mensagem;
    divErro.classList.remove("oculto");
}

function limparErroCrud() {
    var divErro = document.getElementById("erro-crud");
    divErro.innerText = "";
    divErro.classList.add("oculto");
}