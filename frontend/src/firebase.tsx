import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export const addNode = async (skill: any) => {
  try {
    await setDoc(doc(db, "nodes", skill.name), skill);
  } catch (e) {
    console.log("Failed To Upload Node");
  }
};

export const updateNode = async (skill: any) => {
  try {
    await updateDoc(doc(db, "nodes", skill.name), skill);
  } catch (e) {
    console.log("Failed To Update Node");
  }
};

export const deleteNode = async (name: string) => {
  try {
    await deleteDoc(doc(db, "nodes", name));
  } catch (e) {
    console.log("Failed To Delete Node");
  }
};

export default db;
