
let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

function renderTarefas() {
  listElement.innerHTML = "";

  tarefas.map((todo, index) => {
    let liElement = document.createElement("li");
    if (todo.completa) {
      liElement.classList.add("completed");
    }

    let span = document.createElement("span");
    span.textContent = todo.texto;
    span.onclick = () => toggleCompleta(index);

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    linkElement.textContent = "Excluir";
    linkElement.onclick = () => deletarTarefa(index);

    liElement.appendChild(span);
    liElement.appendChild(linkElement);
    listElement.appendChild(liElement);
  });
}

function adicionarTarefas() {
  if (inputElement.value === '') {
    alert("Digite alguma tarefa");
    return false;
  } else {
    let novaTarefa = {
      texto: inputElement.value,
      completa: false
    };

    tarefas.push(novaTarefa);
    inputElement.value = '';
    renderTarefas();
    salvarDados();
  }
}

function deletarTarefa(posicao) {
  tarefas.splice(posicao, 1);
  renderTarefas();
  salvarDados();
}

function toggleCompleta(index) {
  tarefas[index].completa = !tarefas[index].completa;
  renderTarefas();
  salvarDados();
}

function salvarDados() {
  localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}

buttonElement.onclick = adicionarTarefas;
renderTarefas();
