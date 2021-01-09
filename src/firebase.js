import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCT7NwtFniXj7TEXj37n-HJjGGdXhVUo3g",
    authDomain: "chat-whatsapp-web.firebaseapp.com",
    projectId: "chat-whatsapp-web",
    storageBucket: "chat-whatsapp-web.appspot.com",
    messagingSenderId: "35990732855",
    appId: "1:35990732855:web:adf0e0581cebf37b583fb2",
    measurementId: "G-4CG6EZPMN5"
  };


  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export const auth = firebase.auth()

export default firebase