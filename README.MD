```markdown
# FURIA Fan Chat - Documentação

![FURIA Logo](https://furia.gg/wp-content/uploads/2021/08/logo.png)

Chat interativo para torcedores da FURIA Esports com integração em tempo real e recursos especiais para acompanhamento do time.

## 🚀 Funcionalidades Principais

- **Chat em Tempo Real**  
    Troca de mensagens instantânea entre torcedores com marcação de usuários.

- **Live Match Status**  
    Acompanhamento em tempo real do placar do jogo (FURIA vs NAVI).

- **Sistema de Comandos**  
    - `!help`: Lista de comandos disponíveis.
    - `!curiosidade`: Fatos históricos do time.
    - `!mvp`: Estatísticas do jogador destaque.
    - `!hino`: Grito de guerra oficial.

- **Torcida Automática**  
    Simulação de mensagens de torcedores com frases épicas a cada 4 segundos.

- **Painel Informativo**  
    - Próximos jogos.
    - Escalação do time.
    - Estatísticas detalhadas.
    - Integração com WhatsApp (Beta).

- **Leaderboard**  
    Ranking dos usuários mais ativos no chat.

## ⚙️ Pré-requisitos

- Node.js v18+.
- NPM 9+.

## 🛠️ Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/furia-chat.git

# Instalar dependências
npm install

# Iniciar servidor
node server.js
```

## 💻 Uso

- Acesse [http://localhost:3000](http://localhost:3000).
- Digite mensagens normais ou comandos especiais (iniciados com `!`).
- Interaja com os botões de informações do jogo.
- Acompanhe o placar e status ao vivo.
- Consulte o ranking de usuários ativos.

## 🛡️ Tecnologias Utilizadas

### Backend
- Express.js.
- Socket.IO.
- Node Cron.

### Frontend
- HTML5 Semântico.
- CSS Moderno (Flexbox/Grid).
- JavaScript ES6+.

## 📁 Estrutura de Arquivos

```plaintext
furia-chat/
├── public/
│   ├── style.css
│   ├──script.js
│   ├── index.html
├── └── logo-furia.png
├── package.json
└── server.js
```
```
