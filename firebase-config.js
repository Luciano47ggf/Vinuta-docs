// =====================================================================
// CONFIGURAÇÃO DO FIREBASE — VINUTA (projeto: vinuta-qr)
// =====================================================================
// O projectId, authDomain e storageBucket abaixo já estão corretos para
// o projeto "vinuta-qr". Faltam apenas 3 valores que são únicos da sua
// conta e eu não tenho acesso a eles — pegue no Firebase Console:
//
// 1. Acesse https://console.firebase.google.com → projeto "vinuta-qr"
// 2. Engrenagem (⚙) → "Configurações do projeto"
// 3. Role até "Seus apps" → clique no app Web (ou crie um com o ícone </>)
// 4. Copie os valores de apiKey, messagingSenderId e appId que aparecem
//    e cole substituindo os placeholders "COLE_AQUI_..." abaixo.
//
// Depois de preencher, suba este arquivo junto com index.html e
// admin.html no GitHub.
// =====================================================================

const firebaseConfig = {
  apiKey: "COLE_AQUI_SUA_API_KEY",
  authDomain: "vinuta-qr.firebaseapp.com",
  projectId: "vinuta-qr",
  storageBucket: "vinuta-qr.appspot.com",
  messagingSenderId: "COLE_AQUI_SEU_MESSAGING_SENDER_ID",
  appId: "COLE_AQUI_SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
