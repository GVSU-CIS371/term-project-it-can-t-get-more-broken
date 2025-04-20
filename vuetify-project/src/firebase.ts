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
  signInFlow: "popup",  // Use popup flow for sign-in
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID, // Email/password sign-in
    firebase.auth.GoogleAuthProvider.PROVIDER_ID, // Google sign-in
  ],
  signInSuccessUrl: '/', // Redirect on successful sign-in
  callbacks: {
    signInFailure: (error: { code: string; email: any; credential: any; }) => {
      console.log("SignIn Failure", error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.email;
        const pendingCred = error.credential;

        // Fetch sign-in methods for the email to get the correct provider
        firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {
          if (methods.includes(firebase.auth.EmailAuthProvider.PROVIDER_ID)) {
            // Email/password method exists; prompt user to set a password
            console.log("Account exists with a different provider. You can reset your password.");
            // You can add custom handling for password reset here.
          } else {
            // The account exists via other providers (e.g., Google)
            console.log("Account exists, but needs password setup");
          }
        });
      }
    },
  },
};

export { app, auth, analytics, uiConfig, firebaseui };
