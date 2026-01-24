// Funções para adicionar itens
function addAnimacao() {
  const titulo = document.getElementById('animacao-titulo').value;
  const temas = document.getElementById('animacao-temas').value;
  
  if (titulo && temas) {
    const container = document.getElementById('animacoes-custom');
    const newBox = document.createElement('section');
    newBox.className = 'box custom-item';
    newBox.innerHTML = `
      <h3>🎬 ${titulo}</h3>
      <p>${temas.replace(/\n/g, '<br>')}</p>
      <button class="delete-btn" onclick="this.parentElement.remove()">Excluir</button>
    `;
    container.appendChild(newBox);
    
    document.getElementById('animacao-titulo').value = '';
    document.getElementById('animacao-temas').value = '';
  } else {
    alert('Preencha todos os campos!');
  }
}

function addFilme() {
  const titulo = document.getElementById('filme-titulo').value;
  const temas = document.getElementById('filme-temas').value;
  
  if (titulo && temas) {
    const container = document.getElementById('filmes-custom');
    const newBox = document.createElement('section');
    newBox.className = 'box custom-item';
    newBox.innerHTML = `
      <h3>${titulo}</h3>
      <p>${temas}</p>
      <button class="delete-btn" onclick="this.parentElement.remove()">Excluir</button>
    `;
    container.appendChild(newBox);
    
    document.getElementById('filme-titulo').value = '';
    document.getElementById('filme-temas').value = '';
  } else {
    alert('Preencha todos os campos!');
  }
}

function addLivro() {
  const titulo = document.getElementById('livro-titulo').value;
  const temas = document.getElementById('livro-temas').value;
  
  if (titulo && temas) {
    const container = document.getElementById('livros-custom');
    const newBox = document.createElement('section');
    newBox.className = 'box custom-item';
    newBox.innerHTML = `
      <h3>${titulo}</h3>
      <p>${temas}</p>
      <button class="delete-btn" onclick="this.parentElement.remove()">Excluir</button>
    `;
    container.appendChild(newBox);
    
    document.getElementById('livro-titulo').value = '';
    document.getElementById('livro-temas').value = '';
  } else {
    alert('Preencha todos os campos!');
  }
}

// Verificação de senha do administrador
function verificarSenhaAdmin() {
  const senhaCorreta = '921468Fe#';
  const senhaDigitada = prompt('🔐 Digite a senha de administrador:');
  
  if (senhaDigitada === senhaCorreta) {
    return true;
  } else if (senhaDigitada === null) {
    return false;
  } else {
    alert('❌ Senha incorreta! Apenas administradores podem acessar.');
    return false;
  }
}

// Gerenciar temas (adicionar e organizar por mês)
function addTema() {
  if (!verificarSenhaAdmin()) {
    return;
  }
  
  const tema = document.getElementById('tema-input').value;
  const mes = document.getElementById('tema-mes').value;
  
  if (tema && mes) {
    const container = document.getElementById('temas-custom');
    const newBox = document.createElement('section');
    newBox.className = 'box custom-item';
    newBox.setAttribute('data-mes', mes);
    newBox.innerHTML = `
      <span class="tema-mes-tag">📅 ${mes}</span>
      ${tema}
      <button class="delete-btn admin-only" onclick="deleteTema(this)">🗑️ Excluir</button>
    `;
    container.appendChild(newBox);
    
    organizarTemasPorMes();
    
    document.getElementById('tema-input').value = '';
    document.getElementById('tema-mes').value = '';
    alert('✅ Tema adicionado com sucesso!');
  } else {
    alert('Preencha o tema e selecione o mês!');
  }
}

function deleteTema(button) {
  if (!verificarSenhaAdmin()) {
    return;
  }
  
  if (confirm('Tem certeza que deseja excluir este tema?')) {
    button.parentElement.remove();
    alert('✅ Tema excluído!');
  }
}

function organizarTemasPorMes() {
  const container = document.getElementById('temas-custom');
  const temas = Array.from(container.children);
  
  const mesesOrdem = {
    'Janeiro': 1, 'Fevereiro': 2, 'Março': 3, 'Abril': 4,
    'Maio': 5, 'Junho': 6, 'Julho': 7, 'Agosto': 8,
    'Setembro': 9, 'Outubro': 10, 'Novembro': 11, 'Dezembro': 12
  };
  
  temas.sort((a, b) => {
    const mesA = a.getAttribute('data-mes');
    const mesB = b.getAttribute('data-mes');
    return (mesesOrdem[mesA] || 0) - (mesesOrdem[mesB] || 0);
  });
  
  temas.forEach(tema => container.appendChild(tema));
}

function limparTemasAntigos() {
  if (!verificarSenhaAdmin()) {
    return;
  }
  
  const mesAtual = new Date().toLocaleString('pt-BR', { month: 'long' });
  const mesAtualCapitalizado = mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1);
  
  const container = document.getElementById('temas-custom');
  const temas = Array.from(container.children);
  
  const mesesOrdem = {
    'Janeiro': 1, 'Fevereiro': 2, 'Março': 3, 'Abril': 4,
    'Maio': 5, 'Junho': 6, 'Julho': 7, 'Agosto': 8,
    'Setembro': 9, 'Outubro': 10, 'Novembro': 11, 'Dezembro': 12
  };
  
  let removidos = 0;
  temas.forEach(tema => {
    const mes = tema.getAttribute('data-mes');
    if (mesesOrdem[mes] < mesesOrdem[mesAtualCapitalizado]) {
      tema.remove();
      removidos++;
    }
  });
  
  if (removidos > 0) {
    alert(`✅ ${removidos} tema(s) antigo(s) removido(s)!`);
  } else {
    alert('ℹ️ Nenhum tema antigo encontrado.');
  }
}

// ========== SISTEMA DE PRESENÇA E NOTAS ==========

let alunos = { A: [], B: [], C: [] };
let turmaAtual = 'A';

function acessarSistemaPresenca() {
  if (!verificarSenhaAdmin()) {
    return;
  }
  
  document.getElementById('painel-presenca').style.display = 'block';
  setTimeout(() => {
    document.getElementById('painel-presenca').scrollIntoView({ behavior: 'smooth' });
  }, 100);
  renderizarAlunos(turmaAtual);
}

function fecharPainelPresenca() {
  document.getElementById('painel-presenca').style.display = 'none';
}

function mudarTurma(turma) {
  turmaAtual = turma;
  
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.turma-content').forEach(c => c.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById('turma-' + turma).classList.add('active');
  
  renderizarAlunos(turma);
}

function addAluno(turma) {
  const nome = document.getElementById('aluno-nome-' + turma).value.trim();
  
  if (nome) {
    alunos[turma].push({
      id: Date.now(),
      nome: nome,
      presencas: [],
      notas: []
    });
    
    // Ordenar alfabeticamente
    alunos[turma].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    
    document.getElementById('aluno-nome-' + turma).value = '';
    renderizarAlunos(turma);
    alert('✅ Aluno adicionado à Turma ' + turma + '!');
  } else {
    alert('Digite o nome do aluno!');
  }
}

function deleteAluno(turma, id) {
  if (confirm('Tem certeza que deseja remover este aluno?')) {
    alunos[turma] = alunos[turma].filter(a => a.id !== id);
    renderizarAlunos(turma);
    alert('✅ Aluno removido!');
  }
}

function renderizarAlunos(turma) {
  const container = document.getElementById('lista-alunos-' + turma);
  
  if (alunos[turma].length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhum aluno cadastrado ainda.</p>';
    return;
  }
  
  container.innerHTML = alunos[turma].map(aluno => {
    const media = calcularMedia(aluno.notas);
    return `
      <div class="aluno-card">
        <div class="aluno-header">
          <h4>👤 ${aluno.nome} <span class="turma-badge">Turma ${turma}</span></h4>
          <button class="delete-btn-small" onclick="deleteAluno('${turma}', ${aluno.id})">🗑️</button>
        </div>
        <div class="aluno-info">
          <div>
            <strong>📅 Presenças:</strong> ${aluno.presencas.length} dia(s)
            <button class="btn-small" onclick="marcarPresenca('${turma}', ${aluno.id})">✅ Adicionar</button>
          </div>
          <div>
            <strong>📝 Média:</strong> ${media >= 0 ? media.toFixed(0) : 'N/A'}
            <button class="btn-small" onclick="adicionarNota('${turma}', ${aluno.id})">➕ Nota</button>
          </div>
        </div>
        <div class="aluno-detalhes">
          ${aluno.presencas.length > 0 ? `
            <div><strong>Datas de presença:</strong> ${aluno.presencas.join(', ')}</div>
          ` : ''}
          ${aluno.notas.length > 0 ? `
            <div><strong>Notas registradas:</strong> ${aluno.notas.map(n => `${n.valor} (${n.data})`).join(', ')}</div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function marcarPresenca(turma, id) {
  const data = prompt('Digite a data da presença (ex: 24/01/2026):');
  
  if (data) {
    const aluno = alunos[turma].find(a => a.id === id);
    if (aluno) {
      aluno.presencas.push(data);
      renderizarAlunos(turma);
      alert('✅ Presença registrada!');
    }
  }
}

function adicionarNota(turma, id) {
  const nota = prompt('Digite a nota (0-1000):');
  const data = prompt('Digite a data da avaliação (ex: 24/01/2026):');
  
  if (nota && data) {
    const notaNum = parseFloat(nota.replace(',', '.'));
    if (notaNum >= 0 && notaNum <= 1000) {
      const aluno = alunos[turma].find(a => a.id === id);
      if (aluno) {
        aluno.notas.push({ valor: notaNum, data: data });
        renderizarAlunos(turma);
        alert('✅ Nota adicionada!');
      }
    } else {
      alert('❌ Nota inválida! Use valores de 0 a 1000.');
    }
  }
}

function calcularMedia(notas) {
  if (notas.length === 0) return -1;
  const soma = notas.reduce((acc, n) => acc + n.valor, 0);
  return soma / notas.length;
}

function limparTurma() {
  if (!verificarSenhaAdmin()) {
    return;
  }
  
  if (confirm('⚠️ Isso vai remover TODOS os alunos da Turma ' + turmaAtual + '. Confirma?')) {
    alunos[turmaAtual] = [];
    renderizarAlunos(turmaAtual);
    alert('✅ Turma ' + turmaAtual + ' limpa!');
  }
}

function limparTodosAlunos() {
  if (!verificarSenhaAdmin()) {
    return;
  }
  
  if (confirm('⚠️ ATENÇÃO! Isso vai remover TODAS as turmas e seus dados. Confirma?')) {
    if (confirm('Tem CERTEZA? Esta ação não pode ser desfeita!')) {
      alunos = { A: [], B: [], C: [] };
      renderizarAlunos('A');
      renderizarAlunos('B');
      renderizarAlunos('C');
      alert('✅ Todas as turmas foram limpas!');
    }
  }
}

// ========== EASTER EGG ==========

const frasesMotivacionais = [
  "A nota 1000 é só uma questão de prática! 🌟",
  "Você não está estudando, está construindo seu futuro! 🚀",
  "Cada redação que você escreve te aproxima da aprovação! 💪",
  "O Enem não mede sua inteligência, mede sua dedicação! 📖",
  "Lembre-se: até o repertório mais incrível começou com um filme! 🎬",
  "Continue assim! Você está no caminho certo! ✨",
  "Sucesso é a soma de pequenos esforços repetidos! 🏆",
  "Quanto mais você pratica, melhor você fica! 📚",
  "A persistência é o caminho do êxito! 💡"
];

let fraseAtualIndex = -1;

function showEasterEgg() {
  const modal = document.getElementById('easterEggModal');
  const fraseElement = document.getElementById('fraseMotivacional');
  
  // Escolhe uma frase diferente da anterior
  let novoIndex;
  do {
    novoIndex = Math.floor(Math.random() * frasesMotivacionais.length);
  } while (novoIndex === fraseAtualIndex && frasesMotivacionais.length > 1);
  
  fraseAtualIndex = novoIndex;
  fraseElement.textContent = frasesMotivacionais[fraseAtualIndex];
  
  modal.style.display = 'flex';
  createConfetti();
}

function closeEasterEgg() {
  document.getElementById('easterEggModal').style.display = 'none';
}

function createConfetti() {
  const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

// Easter Egg Extra: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    alert('🎮 KONAMI CODE ATIVADO! Você é um verdadeiro gamer-estudante! 🎓🕹️');
    document.body.style.animation = 'rainbow 2s infinite';
  }
});