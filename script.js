function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function saveList(tipo, lista) {
  localStorage.setItem("lista_" + tipo, JSON.stringify(lista));
}


function loadList(tipo) {
  const data = localStorage.getItem("lista_" + tipo);
  return data ? JSON.parse(data) : [];
}


function render(tipo) {
  const lista = loadList(tipo);
  const div = document.getElementById("lista" + capitalize(tipo));

  if (!div) return;

  div.innerHTML = "";

  lista.forEach((item, index) => {
    const box = document.createElement("section");
    box.className = "box";

    box.innerHTML = `
      <p style="margin:0; ${item.feito ? 'text-decoration: line-through;' : ''}">
        ${item.texto}
      </p>

      <div style="margin-top:10px;">
        <button onclick="marcar('${tipo}', ${index})">✔</button>
        <button onclick="remover('${tipo}', ${index})">🗑</button>
      </div>
    `;

    div.appendChild(box);
  });
}


function addItem(tipo) {
  const input = document.getElementById("add" + capitalize(tipo) + "Input");

  if (!input || input.value.trim() === "") return;

  const lista = loadList(tipo);
  lista.push({ texto: input.value.trim(), feito: false });
  saveList(tipo, lista);

  input.value = "";
  render(tipo);
}


function marcar(tipo, index) {
  const lista = loadList(tipo);
  lista[index].feito = !lista[index].feito;
  saveList(tipo, lista);
  render(tipo);
}

function remover(tipo, index) {
  const lista = loadList(tipo);
  lista.splice(index, 1);
  saveList(tipo, lista);
  render(tipo);
}

["animacoes", "livros", "temas"].forEach(render);
