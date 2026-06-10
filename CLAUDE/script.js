var filmes = [
  "Clube da Luta (1999)",
  "Interestelar (2014)",
  "Parasita (2019)",
  "O Poderoso Chefão (1972)",
  "Oppenheimer (2023)"
];

var USUARIO_CORRETO = "aluno";
var SENHA_CORRETA   = "fiap2025";
var META_FILMES     = 20;

function hashCor(str) {
  var cores = ["#f59e0b","#8b5cf6","#10b981","#3b82f6","#ec4899","#14b8a6","#f97316","#06b6d4","#a855f7","#22c55e","#ef4444","#6366f1"];
  var hash = 0;
  for (var i = 0; i < str.length; i++) { hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff; }
  return cores[Math.abs(hash) % cores.length];
}

function truncar(str, max) {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

function mostrarToast(texto, tipo) {
  var container = document.getElementById("toast-container");
  var toast = document.createElement("div");
  toast.className = "toast " + tipo;
  var icone = tipo === "success" ? "✅" : tipo === "error" ? "❌" : "ℹ️";
  toast.innerHTML = '<span class="toast-icon">' + icone + '</span><span>' + texto + '</span>';
  container.appendChild(toast);
  setTimeout(function() {
    toast.classList.add("out");
    setTimeout(function() { if (toast.parentNode) { toast.parentNode.removeChild(toast); } }, 220);
  }, 2800);
}

function exibirMsg(id, texto, tipo) {
  var el = document.getElementById(id);
  el.textContent = texto;
  el.className = "msg " + tipo + " show";
  if (tipo !== "error") { setTimeout(function() { el.className = "msg"; }, 2500); }
}

function limparMsg(id) { document.getElementById(id).className = "msg"; }

function mostrarPagina(id) {
  var paginas = document.querySelectorAll(".page");
  for (var i = 0; i < paginas.length; i++) { paginas[i].classList.remove("active"); }
  document.getElementById(id).classList.add("active");
}

function fazerLogin() {
  var usuario = document.getElementById("input-user").value.trim();
  var senha   = document.getElementById("input-pass").value;
  if (usuario === "" || senha === "") { exibirMsg("msg-login", "Preencha usuário e senha antes de continuar.", "error"); return; }
  if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
    limparMsg("msg-login");
    mostrarPagina("page-app");
    renderizarTudo();
  } else {
    exibirMsg("msg-login", "Usuário ou senha incorretos. Tente novamente.", "error");
    document.getElementById("input-pass").value = "";
    document.getElementById("input-pass").focus();
  }
}

function fazerLogout() {
  document.getElementById("input-user").value = "";
  document.getElementById("input-pass").value = "";
  limparMsg("msg-login");
  mostrarPagina("page-login");
}

function adicionarAoFinal() {
  var input = document.getElementById("input-new-movie");
  var valor = input.value.trim();
  if (valor === "") { exibirMsg("msg-add", "O título do filme não pode ficar vazio.", "error"); return; }
  filmes.push(valor);
  input.value = "";
  limparMsg("msg-add");
  renderizarTudo();
  mostrarToast("\"" + truncar(valor, 30) + "\" adicionado ao final.", "success");
}

function adicionarAoInicio() {
  var input = document.getElementById("input-new-movie");
  var valor = input.value.trim();
  if (valor === "") { exibirMsg("msg-add", "O título do filme não pode ficar vazio.", "error"); return; }
  filmes.unshift(valor);
  input.value = "";
  limparMsg("msg-add");
  renderizarTudo();
  mostrarToast("\"" + truncar(valor, 30) + "\" adicionado ao início.", "success");
}

function removerFilme(indice) {
  var titulo = filmes[indice];
  filmes.splice(indice, 1);
  renderizarTudo();
  mostrarToast("\"" + truncar(titulo, 30) + "\" removido.", "error");
}

function iniciarEdicao(indice) {
  var card = document.querySelector("[data-index='" + indice + "']");
  card.classList.add("editing");
  var inp = card.querySelector(".edit-inline-input");
  inp.value = filmes[indice];
  inp.focus();
  inp.select();
}

function salvarEdicao(indice) {
  var card  = document.querySelector("[data-index='" + indice + "']");
  var valor = card.querySelector(".edit-inline-input").value.trim();
  if (valor === "") { cancelarEdicao(indice); mostrarToast("Edição cancelada — título vazio.", "info"); return; }
  var antigo = filmes[indice];
  filmes[indice] = valor;
  renderizarTudo();
  mostrarToast("\"" + truncar(antigo, 20) + "\" → \"" + truncar(valor, 20) + "\"", "success");
}

function cancelarEdicao(indice) {
  var card = document.querySelector("[data-index='" + indice + "']");
  if (card) { card.classList.remove("editing"); }
}

function renderizarTudo() { renderizarLista(); atualizarSidebar(); }

function renderizarLista() {
  var lista = document.getElementById("movie-list");
  var vazio = document.getElementById("empty-state");
  var badge = document.getElementById("list-count-badge");
  lista.innerHTML = "";
  badge.textContent = filmes.length + (filmes.length === 1 ? " filme" : " filmes");
  if (filmes.length === 0) { vazio.style.display = "block"; return; }
  vazio.style.display = "none";
  for (var i = 0; i < filmes.length; i++) { lista.appendChild(criarCard(i)); }
}

function criarCard(indice) {
  var cor = hashCor(filmes[indice]);
  var li = document.createElement("li");
  li.className = "movie-card";
  li.setAttribute("data-index", indice);

  var stripe = document.createElement("div");
  stripe.className = "card-stripe";
  stripe.style.background = cor;

  var rank = document.createElement("div");
  rank.className = "card-rank";
  rank.textContent = indice + 1;

  var info = document.createElement("div");
  info.className = "card-info";
  var titulo = document.createElement("div");
  titulo.className = "card-title";
  titulo.textContent = filmes[indice];
  var meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = '<span>🎬 Assistido</span><span class="dot"></span><span style="color:' + cor + '">★★★★☆</span>';
  info.appendChild(titulo);
  info.appendChild(meta);

  var editWrap = document.createElement("div");
  editWrap.className = "card-edit-wrap";
  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-inline-input";
  editInput.placeholder = "Novo título…";
  (function(idx) {
    editInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter")  { salvarEdicao(idx); }
      if (e.key === "Escape") { cancelarEdicao(idx); }
    });
  })(indice);
  editWrap.appendChild(editInput);

  var actions = document.createElement("div");
  actions.className = "card-actions";
  var normalBtns = document.createElement("div");
  normalBtns.className = "normal-btns";

  var btnEdit = document.createElement("button");
  btnEdit.className = "icon-btn edit";
  btnEdit.title = "Editar filme";
  btnEdit.innerHTML = "✏️";
  (function(idx) { btnEdit.addEventListener("click", function() { iniciarEdicao(idx); }); })(indice);

  var btnDel = document.createElement("button");
  btnDel.className = "icon-btn del";
  btnDel.title = "Remover filme";
  btnDel.innerHTML = "🗑";
  (function(idx) { btnDel.addEventListener("click", function() { removerFilme(idx); }); })(indice);

  normalBtns.appendChild(btnEdit);
  normalBtns.appendChild(btnDel);

  var editBtns = document.createElement("div");
  editBtns.className = "edit-btns";

  var btnSave = document.createElement("button");
  btnSave.className = "btn btn-success-sm";
  btnSave.style.cssText = "padding:.38rem .75rem;font-size:.75rem;";
  btnSave.innerHTML = "✓ Salvar";
  (function(idx) { btnSave.addEventListener("click", function() { salvarEdicao(idx); }); })(indice);

  var btnCancel = document.createElement("button");
  btnCancel.className = "btn btn-ghost";
  btnCancel.style.cssText = "padding:.38rem .75rem;font-size:.75rem;";
  btnCancel.innerHTML = "✕";
  (function(idx) { btnCancel.addEventListener("click", function() { cancelarEdicao(idx); }); })(indice);

  editBtns.appendChild(btnSave);
  editBtns.appendChild(btnCancel);
  actions.appendChild(normalBtns);
  actions.appendChild(editBtns);

  li.appendChild(stripe);
  li.appendChild(rank);
  li.appendChild(info);
  li.appendChild(editWrap);
  li.appendChild(actions);
  return li;
}

function atualizarSidebar() {
  var total = filmes.length;
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-first").textContent = total > 0 ? filmes[0] : "—";
  document.getElementById("stat-last").textContent  = total > 0 ? filmes[total - 1] : "—";
  var pct = Math.min(Math.round((total / META_FILMES) * 100), 100);
  document.getElementById("progress-pct").textContent = pct + "%";
  document.getElementById("progress-fill").style.width = pct + "%";
}

function renderizarPosterGrid() {
  var grid = document.getElementById("poster-grid");
  for (var i = 0; i < 20; i++) {
    var cell = document.createElement("div");
    cell.className = "poster-cell";
    grid.appendChild(cell);
  }
}

function inicializarEventos() {
  document.getElementById("btn-login").addEventListener("click", fazerLogin);
  document.getElementById("btn-logout").addEventListener("click", fazerLogout);
  document.getElementById("btn-logout-header").addEventListener("click", fazerLogout);
  document.getElementById("btn-add-end").addEventListener("click", adicionarAoFinal);
  document.getElementById("btn-add-start").addEventListener("click", adicionarAoInicio);
  document.getElementById("input-user").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { document.getElementById("input-pass").focus(); }
  });
  document.getElementById("input-pass").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { fazerLogin(); }
  });
  document.getElementById("input-new-movie").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { adicionarAoFinal(); }
  });
}

renderizarPosterGrid();
inicializarEventos();