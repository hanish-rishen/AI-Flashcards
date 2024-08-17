import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD01A9Xgfe12aHQ_aO6VqIxeIiXYeuyC-M",
    authDomain: "ai-flashcards-11e15.firebaseapp.com",
    projectId: "ai-flashcards-11e15",
    storageBucket: "ai-flashcards-11e15.appspot.com",
    messagingSenderId: "434181273853",
    appId: "1:434181273853:web:e6cd6841a369c19a712694",
    measurementId: "G-RFVJT7XXLZ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);