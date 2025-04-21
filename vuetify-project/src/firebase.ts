// src/firebase.ts
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBt_fcY3mxL4pe7JC6W1Yt5snzm2Sl_A9Y",
  authDomain: "calandardb.firebaseapp.com",
  projectId: "calandardb",
  storageBucket: "calandardb.firebasestorage.app",
  messagingSenderId: "252830959474",
  appId: "1:252830959474:web:64af03a7f53b8d00003feb",
  measurementId: "G-Z1LQJFQ41V"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

// FirebaseUI config
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID, // Email/password sign-in
    firebase.auth.GoogleAuthProvider.PROVIDER_ID, // Google sign-in
    firebase.auth.FacebookAuthProvider.PROVIDER_ID, // Facebook sign-in
  ],
  signInSuccessUrl: '/', // Redirect on successful sign-in
};

export { app, auth, analytics, uiConfig, firebaseui };
