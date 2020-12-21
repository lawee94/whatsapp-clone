import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBYDHyOfGwEYKazOGNBx6qGG7jK6rgvCLk",
    authDomain: "whatsapp-clone-b3c9d.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-b3c9d.firebaseio.com",
    projectId: "whatsapp-clone-b3c9d",
    storageBucket: "whatsapp-clone-b3c9d.appspot.com",
    messagingSenderId: "1036088796010",
    appId: "1:1036088796010:web:a0d8c871a05bfced1bfb13",
};

const firebaseApp = Firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = Firebase.auth();
const provider = new Firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
