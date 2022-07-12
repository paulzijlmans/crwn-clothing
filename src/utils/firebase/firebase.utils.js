import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crwn-clothing-db-2ea6f.firebaseapp.com",
  projectId: "crwn-clothing-db-2ea6f",
  storageBucket: "crwn-clothing-db-2ea6f.appspot.com",
  messagingSenderId: "1059563099696",
  appId: "1:1059563099696:web:a70f7309b96d905bee3ff5"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);