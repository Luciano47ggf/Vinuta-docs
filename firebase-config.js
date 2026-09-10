// =====================================================================
// CONFIGURAÇÃO DO FIREBASE — VINUTA (projeto: vinuta-qr)
// =====================================================================
// Este arquivo é compartilhado por index.html e admin.html.
//
// IMPORTANTE: o index.html (formulário público) NÃO carrega o SDK
// firebase-auth-compat.js, porque convidados não fazem login. Por isso
// "auth" é montado com uma checagem defensiva abaixo — se o SDK de auth
// não estiver presente na página, "auth" simplesmente vira null, em vez
// de quebrar o formulário com um erro de "firebase.auth is not a
// function".
// =====================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBpb5ZEJqNX5A2528Dyh8-N9gez_Ho2IcU",
  authDomain: "vinuta-qr.firebaseapp.com",
  projectId: "vinuta-qr",
  storageBucket: "vinuta-qr.firebasestorage.app",
  messagingSenderId: "834430313789",
  appId: "1:834430313789:web:6f570ddb42f232b4421154",
  measurementId: "G-GZL5NVCL3N"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth =
  typeof firebase.auth === "function"
    ? firebase.auth()
    : null;
