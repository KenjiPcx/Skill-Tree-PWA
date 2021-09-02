import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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

export const batchUpdateNodes = async (skills: any[], skill: any) => {
  try {
    const batch = writeBatch(db);
    batch.update(doc(db, "nodes", skill.name), skill);
    skills.forEach((skill: any) => {
      batch.update(doc(db, "nodes", skill.name), skill);
    });
    await batch.commit();
  } catch (e) {
    console.log("Failed To Batch Update", e);
  }
};