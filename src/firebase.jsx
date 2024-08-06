import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC2oUMkEDVg_8TAT6ss8fSMZMj9ifLH6QY",
  authDomain: "phonetapify-test.firebaseapp.com",
  databaseURL: "https://phonetapify-test-default-rtdb.firebaseio.com",
  projectId: "phonetapify-test",
  storageBucket: "phonetapify-test.appspot.com",
  messagingSenderId: "1012980776348",
  appId: "1:1012980776348:web:df0e1ce82d13c2fcd7dc59",
  measurementId: "G-8RTVQJHRQT"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
