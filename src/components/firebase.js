import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCKfZtP2ZIISDtnk3KoPyxP5v7xupZLncM",
  authDomain: "slack-clone-621e6.firebaseapp.com",
  projectId: "slack-clone-621e6",
  storageBucket: "slack-clone-621e6.appspot.com",
  messagingSenderId: "245199218002",
  appId: "1:245199218002:web:0d44182020ba60efc8c68b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export { provider, db, auth}