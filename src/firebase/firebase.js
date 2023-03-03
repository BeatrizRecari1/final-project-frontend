import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

async function authenticate() {
  await signInWithPopup(auth, googleProvider);
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

export { authenticate, logout, auth, addExercise, getExercises };
