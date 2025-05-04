const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const onlineCount = document.getElementById('online-count');

// Define nome de usuário aleatório
const username = "User" + Math.floor(Math.random() * 10000);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!input.value) return;

  const mensagem = input.value.trim();

  if (mensagem.startsWith("!")) {
    processarComando(mensagem);
  } else {
    socket.emit('chat message', {
      user: username,
      text: mensagem
    });
  }

  input.value = '';
});


socket.on('chat message', function (data) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

// Simulação automática de torcida
const torcidas = [
  "🔥 VAMO FURIAAAAA!!! 🔥",
  "💪 É agora, safe ta nossa!",
  "🚀 KSCERATO MONSTRO!",
  "👊 Que bala do FalleN!",
  "🖤 FURIA É TRADIÇÃO!",
  "⚡ FALLEN É LENDÁRIO!",
  "🏆 VAI PRA FINAL!",
  "🔫 É TRABALHO DE PROFISSIONAL!",
  "💣 A bomba é nossa!",
  "🎯 Headshot limpo!",
  "🙌 A torcida tá junto!",
  "🔥 Essa é a FURIA que a gente conhece!",
  "🎮 QUE RUSH FOI ESSE?",
  "🧠 Estratégia perfeita, GG!",
  "🗣️ FURIA! FURIA! FURIA!"
];

function gerarNomeTorcedorAleatorio() {
  const nomes = [
    "torcedor_furia01", "cszeiro22", "furiosaa", "arTzera97", "fanFURIAx",
    "sk_furia", "brKSC", "furiaHead", "mestreCT", "rushBman"
  ];
  const sufixo = Math.floor(Math.random() * 100);
  return nomes[Math.floor(Math.random() * nomes.length)] + sufixo;
}

function enviarMensagemTorcida() {
  const aleatorio = torcidas[Math.floor(Math.random() * torcidas.length)];
  const nome = gerarNomeTorcedorAleatorio();
  socket.emit('chat message', {
    user: nome,
    text: aleatorio
  });
}


setInterval(enviarMensagemTorcida, 4000);

// Botões informativos
function enviarInfo(tipo) {
  const mensagens = {
    placar: "📣 Placar Atual: FURIA 13 x 9 NAVI",
    escalação: "👥 Titulares: KZMOLODOY, LVYEKINDAR, BRFalleN, BRKSCERATO, BRyuurih | Reservas: BRskullz, BRchelo",
    proximo: "📅 Próximo Jogo: FURIA x G2 - 03/05 às 16h (horário de Brasília)",
    estatisticas: "📊 Estatísticas: FalleN 13/9 | KSCERATO 22/8 | yuurih 15/12 | KZMOLODOY 14/10 | LVYEKINDAR 16/11"
  };
  if (mensagens[tipo]) {
    socket.emit('chat message', {
      user: '📢 Sistema',
      text: mensagens[tipo]
    });
  }
}

// Atualiza número de usuários online
socket.on('users online', (count) => {
  onlineCount.textContent = `👥 ${count} online`;
});

function processarComando(comando) {
  const respostas = {
    "!help": "📖 Comandos disponíveis: !help, !curiosidade, !hino, !drop, !mvp",
    "!curiosidade": [
      "🐆 A FURIA foi fundada em 2017 e rapidamente virou referência no CS brasileiro.",
      "🌎 A FURIA já representou o Brasil em diversos Majors ao redor do mundo.",
      "🧠 O nome 'FURIA' simboliza intensidade e paixão em tudo que fazem.",
      "🎯 KSCERATO é conhecido como um dos riflers mais consistentes do cenário mundial."
    ],
    "!hino": "🎵 \"FURIA na mente, vitória na mira!\" 🔥",
    "!drop": "🎁 Você recebeu um sticker virtual exclusivo da FURIA!",
    "!mvp": "🏆 Destaque da partida: BRKSCERATO com 24 abates!"
  };

  let resposta;

  if (comando === "!curiosidade") {
    const lista = respostas[comando];
    resposta = lista[Math.floor(Math.random() * lista.length)];
  } else {
    resposta = respostas[comando] || "❓ Comando não reconhecido. Digite !help para ver os disponíveis.";
  }

  socket.emit('chat message', {
    user: '🤖 Comando',
    text: resposta
  });
}
