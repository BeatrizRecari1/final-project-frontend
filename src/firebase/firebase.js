import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig); //initializes a Firebase app using the "initializeApp()"" function and a configuration object called "firebaseConfig"
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

async function authenticateWithGoogle() {
  await signInWithPopup(auth, googleProvider);
}

async function authenticateWithEmail(email, password, type) {
  switch (type) {
    case "signIn":
      await signInWithEmailAndPassword(auth, email, password);
      return;
    case "signUp":
      await createUserWithEmailAndPassword(auth, email, password);
      return;
    default:
      throw new Error("invalid type");
  }
}

async function logout() {
  await signOut(auth);
}

function addExercise(exerciseData) {
  return addDoc(collection(db, "exercises"), {
    ...exerciseData,
    owner: auth.currentUser.uid,
  })
    .then((res) => {
      return getDoc(doc(db, "exercises", res.id));
    })
    .then((res) => res.data());
}

function getExercises() {
  return getDocs(
    query(
      collection(db, "exercises"),
      where("owner", "==", auth.currentUser.uid)
    )
  ).then((res) => {
    return res.docs.map((doc) => doc.data());
  });
}

export {
  authenticateWithGoogle,
  authenticateWithEmail,
  logout,
  auth,
  addExercise,
  getExercises,
};
