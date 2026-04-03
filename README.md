# 🌊 SOS Enchentes PE

Plataforma de emergência para monitorar e reportar alagamentos, deslizamentos e áreas de risco em Pernambuco em tempo real.

---

## 📁 Estrutura do Projeto

```
sos-enchentes-pe/
└── src/
    ├── pages/
    │   ├── index.html      → Tela inicial (home + feed)
    │   ├── reportar.html   → Formulário de ocorrência
    │   ├── ajuda.html      → Botão SOS de emergência
    │   └── mapa.html       → Mapa interativo (Leaflet)
    ├── css/
    │   └── style.css       → Estilos globais (mobile-first)
    └── js/
        ├── firebase.js     → Integração Firestore + Storage
        └── app.js          → Utilitários compartilhados
```

---

## 🔥 Configuração do Firebase

### 1. Criar projeto no Firebase

1. Acesse [https://console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Dê um nome (ex: `sos-enchentes-pe`) e siga os passos
4. Quando o projeto estiver criado, clique no ícone **`</>`** (Web) para registrar um app

### 2. Obter as credenciais

Após registrar o app, o Firebase mostrará um objeto como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXX",
  authDomain: "sos-enchentes.firebaseapp.com",
  projectId: "sos-enchentes",
  storageBucket: "sos-enchentes.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 3. Colar as credenciais no projeto

Abra `src/js/firebase.js` e substitua o bloco `firebaseConfig` pelos seus dados.

### 4. Ativar o Firestore

1. No console Firebase → **Firestore Database** → **Criar banco de dados**
2. Escolha **"Iniciar no modo de teste"** (permite leitura/escrita por 30 dias)
3. Selecione a região `southamerica-east1` (São Paulo, mais próxima de PE)

### 5. Ativar o Firebase Storage (para fotos)

1. No console → **Storage** → **Começar**
2. Aceite as regras padrão de teste

### 6. Regras de segurança recomendadas (Firestore)

Para produção, substitua as regras no console por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ocorrencias/{doc} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['tipo','urgencia','descricao','criadoEm']);
      allow update, delete: if false;
    }
  }
}
```

---

## 🚀 Executar Localmente

### Opção 1: VS Code Live Server (recomendado)

1. Instale a extensão **Live Server** no VS Code
2. Clique com o botão direito em `src/pages/index.html`
3. Selecione **"Open with Live Server"**

### Opção 2: Python (sem instalação extra)

```bash
# Na raiz do projeto:
cd src/pages
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

### Opção 3: Node.js serve

```bash
npm install -g serve
serve src/pages
```

> ⚠️ **Importante:** O projeto usa ES Modules (`type="module"`), então **não funciona** ao abrir o HTML diretamente com `file://`. Use sempre um servidor local.

---

## 📱 Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🏠 **Home** | Dashboard com stats ao vivo e feed de ocorrências |
| 📋 **Reportar** | Formulário com tipo, urgência, descrição, foto e GPS |
| 🆘 **Pedir Ajuda** | Botão SOS com envio de localização em 1 toque |
| 🗺️ **Mapa** | Mapa interativo com marcadores coloridos por urgência |
| ⏱️ **Tempo relativo** | "há 5 minutos", "há 2 horas" |
| 📍 **Geolocalização** | Captura automática via Geolocation API |
| 📸 **Upload de foto** | Preview da imagem antes do envio |
| ✅ **Validação** | Feedback visual de erros nos campos |

---

## 🎨 Cores do Sistema

| Cor | Significado |
|---|---|
| 🔴 Vermelho | Urgente / Perigo imediato |
| 🟡 Amarelo | Médio / Requer atenção |
| 🟢 Verde | Leve / Situação controlável |
| 🔵 Azul | Localização do usuário no mapa |

---

## 📞 Contatos de Emergência

- **193** — Bombeiros
- **199** — Defesa Civil
- **192** — SAMU

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 / CSS3 / JavaScript ES Modules**
- **Firebase Firestore** — banco de dados em tempo real
- **Firebase Storage** — armazenamento de imagens
- **Leaflet.js** — mapa interativo
- **Geolocation API** — captura de coordenadas GPS
- **Font Awesome 6** — ícones
- **Google Fonts** — Barlow Condensed + Barlow

---

## 🔧 Deploy (Publicar na internet)

### Firebase Hosting (gratuito)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Defina "src" como pasta pública
firebase deploy
```

### Netlify (arrasta e solta)

1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta `src` para o painel
3. Pronto! URL gerada automaticamente.

---

Feito com ❤️ para Pernambuco — em situações de emergência, cada segundo conta.
