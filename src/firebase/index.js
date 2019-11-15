import firebase from "firebase";

const firebasConfig = {
  apiKey: "AIzaSyBWSpXOBTUtYv7N3IWdyFd3mXWUouNc59o",
  authDomain: "webnoteapp-3f043.firebaseapp.com",
  databaseURL: "https://webnoteapp-3f043.firebaseio.com",
  projectId: "webnoteapp-3f043",
  storageBucket: "webnoteapp-3f043.appspot.com",
  messagingSenderId: "733604078024"
};
firebase.initializeApp(firebasConfig);

export const db = firebase.firestore();
