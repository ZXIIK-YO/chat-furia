```markdown
# Chat da Torcida FURIA — Documentação Técnica

Este README detalha a arquitetura, as escolhas de tecnologias, o passo-a-passo de instalação, configuração e os principais componentes do projeto.

---

## 📋 Sumário

1. [Visão Geral](#-visão-geral)  
2. [Arquitetura e Fluxo de Dados](#-arquitetura-e-fluxo-de-dados)  
3. [Tecnologias e Justificativas](#-tecnologias-e-justificativas)  
4. [Estrutura de Pastas](#-estrutura-de-pastas)  
5. [Configuração e Instalação](#-configuração-e-instalação)  
6. [Execução](#-execução)  
7. [Detalhes do Frontend](#-detalhes-do-frontend)  
8. [Detalhes do Backend](#-detalhes-do-backend)  
9. [Comandos e Interações](#-comandos-e-interações)  
10. [Possíveis Extensões Futuras](#-possíveis-extensões-futuras)  

---

## 🔥 Visão Geral

Chat em tempo real para fãs do time de CS:GO **FURIA**. Permite:
- Troca de mensagens bidirecionais (usuários ↔ servidor)
- Simulação automática de mensagens de torcida
- Contador de usuários online
- “Botões de info” (placar e lineup)
- Comandos de texto (`!help`, `!curiosidade`, etc.)

---

## 🏗 Arquitetura e Fluxo de Dados

1. **Cliente (navegador)**  
    - Conecta-se ao servidor via WebSocket (Socket.IO).  
    - Envia mensagens de texto e comandos.  
    - Recebe mensagens de outros usuários, eventos de sistema e atualização de contador.

2. **Servidor (Node.js + Express + Socket.IO)**  
    - Serve arquivos estáticos (HTML, CSS, JS, imagem).  
    - Gerencia conexões WebSocket: entrada e saída de usuários, contador online.  
    - Redistribui todas as mensagens recebidas a todos os clientes conectados.

3. **Real-time Engine**  
    - **Socket.IO** abstrai WebSocket + fallback HTTP-long-polling.  
    - Garante baixa latência e reconexão automática.

```
[Browser A] ↔ Socket.IO ↔ [Node.js Server] ↔ Socket.IO ↔ [Browser B]
```

---

## 🛠 Tecnologias e Justificativas

| Tecnologia        | Uso                                                 | Por quê?                                     |
|-------------------|-----------------------------------------------------|----------------------------------------------|
| **Node.js**       | Runtime JavaScript no servidor                      | Event-driven, non-blocking I/O; ecossistema npm |
| **Express**       | Framework HTTP para Node.js                         | Configuração rápida de rotas e arquivos estáticos |
| **Socket.IO**     | Biblioteca realtime (WebSocket + fallback)          | Comunicação bidirecional e reconexão automática |
| **HTML5 / CSS3**  | Estrutura e estilos do frontend                     | Compatível com todos os navegadores modernos |
| **JavaScript**    | Lógica de interação no cliente                      | Dinamismo e integração fácil com Socket.IO  |
| **favicon (PNG)** | Logotipo oficial da FURIA                           | Identidade visual e credibilidade           |

---

## 📁 Estrutura de Pastas

```
furia-chat/
├── index.html       # Página principal
├── style.css        # Estilos responsivos e tema FURIA
├── script.js        # Lógica do cliente (WebSocket, comandos, UI)
├── server.js        # Inicialização Express + Socket.IO
├── furia_logo.png   # Imagem no header
└── package.json     # Metadados e dependências npm
```

---

## ⚙️ Configuração e Instalação

1. **Pré-requisitos**  
    - Node.js ≥ v14  
    - npm (já incluso no Node.js)

2. **Clonar repositório**  
    ```bash
    git clone https://github.com/seu-usuario/furia-chat.git
    cd furia-chat
    ```

3. **Instalar dependências**  
    ```bash
    npm install express socket.io
    ```

4. **Execução**  
    ```bash
    node server.js
    ```
    O console exibirá: `Servidor rodando em http://localhost:3000`.

    Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🖥 Detalhes do Frontend (script.js)

- **Geração de nome:**  
  Cada cliente recebe um nome único fixo por sessão (`gerarNomeTorcedorAleatorio()`).

- **Formulário de envio:**  
  - Se a mensagem começa com `!`, chama `processarComando()`.  
  - Senão, emite `{ user, text }` via `socket.emit('chat message', …)`.

- **Recebimento de mensagens:**  
  - `socket.on('chat message', msg => …)` renderiza em `<div id="chat">`.  
  - `socket.on('online count', count => …)` atualiza contador.

- **Simulação automática:**  
  `setInterval(…, 4000)` envia mensagens de torcida com usuários aleatórios.

- **Botões informativos:**  
  `mostrarInfo('placar')` e `mostrarInfo('lineup')` emitem mensagens de sistema.

---

## 🖥 Detalhes do Backend (server.js)

- **Express Static:**  
  `app.use(express.static(__dirname))` para servir `index.html`, `.css`, `.js` e imagem.

- **Rota raiz:**  
  `app.get('/', …)` para evitar `Cannot GET /`.

- **Socket.IO:**  
  - `io.on('connection', socket => { … })`: incrementa `usersOnline`, emite contador.  
  - `socket.on('chat message', msg => io.emit('chat message', msg))` reenvia mensagens.  
  - `socket.on('disconnect', …)`: decrementa contador e emite novo valor.

---

## 💬 Comandos de Chat

| Comando       | Descrição                                      |
|---------------|------------------------------------------------|
| `!help`       | Lista de todos os comandos disponíveis         |
| `!curiosidade`| Curiosidade aleatória sobre a FURIA            |
| `!hino`       | Exibe frase-fundo (hino simbólico)             |
| `!drop`       | Simula a entrega de um brinde virtual          |
| `!mvp`        | Exibe jogador MVP simulado da partida          |

---

## 🔭 Possíveis Extensões Futuras

- Persistência com MongoDB para histórico e leaderboard real.
- Autenticação de usuários (OAuth com Twitch/Discord).
- Integração de API de partidas oficiais para estatísticas em tempo real (HLTV).
- Sistema de enquetes (`!vote`) com resultados agregados.
- Notificações push no navegador para início/fim de partidas.

---

## 🧑‍💻 Autor

**Caio Santos Araujo**  
Analista de Infraestrutura e Suporte | Aspirante a Dev Python  
GitHub: [github.com/seu-usuario](https://github.com/seu-usuario)  
E-mail: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)
```