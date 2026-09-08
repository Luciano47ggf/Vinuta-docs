const firebaseConfig = {
  apiKey: "AIzaSyBpb5ZEJqNX5A2528Dyh8-N9gez_Ho2IcU",
  authDomain: "vinuta-qr.firebaseapp.com",
  projectId: "vinuta-qr",
  storageBucket: "vinuta-qr.firebasestorage.app",
  messagingSenderId: "834430313789",
  appId: "1:834430313789:web:6f570ddb42f232b4421154"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
