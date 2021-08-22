// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';

// Add the Firebase products that you want to use
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import graphData from "./graphData.js";

import dotenv from 'dotenv'
dotenv.config();

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

const addNodeToDb = async (nodeData) => {
  try {
    await setDoc(doc(db, "nodes", nodeData.name), nodeData);
    console.log("Document written with ID: ", nodeData.name);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

graphData.forEach((data) => addNodeToDb(data));
