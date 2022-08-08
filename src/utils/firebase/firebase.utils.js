import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crwn-clothing-db-2ea6f.firebaseapp.com",
  projectId: "crwn-clothing-db-2ea6f",
  storageBucket: "crwn-clothing-db-2ea6f.appspot.com",
  messagingSenderId: "1059563099696",
  appId: "1:1059563099696:web:a70f7309b96d905bee3ff5"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const queryCategories = query(collectionRef);

  const querySnapshot = await getDocs(queryCategories);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithUsernamePassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = async (callback) => onAuthStateChanged(auth, callback);