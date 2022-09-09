// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMQnOOo2rV3a9icF_8W-Dx3eSPgkNNVEI",
  authDomain: "learn-vue-63034.firebaseapp.com",
  projectId: "learn-vue-63034",
  storageBucket: "learn-vue-63034.appspot.com",
  messagingSenderId: "320394873426",
  appId: "1:320394873426:web:25967cd3c34ce8c4b32d8b",
  databaseURL: "https://learn-vue-63034-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
