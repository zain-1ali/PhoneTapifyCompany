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

// const firebaseConfig = {
//   apiKey: "AIzaSyC2oUMkEDVg_8TAT6ss8fSMZMj9ifLH6QY",
//   authDomain: "phonetapify-test.firebaseapp.com",
//   databaseURL: "https://phonetapify-test-default-rtdb.firebaseio.com",
//   projectId: "phonetapify-test",
//   storageBucket: "phonetapify-test.appspot.com",
//   messagingSenderId: "1012980776348",
//   appId: "1:1012980776348:web:df0e1ce82d13c2fcd7dc59",
//   measurementId: "G-8RTVQJHRQT"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1YKfSYzdrNEaO3at_6v6HmBwocd-MHCs",
  authDomain: "phonetapify-c6c06.firebaseapp.com",
  databaseURL: "https://phonetapify-c6c06-default-rtdb.firebaseio.com",
  projectId: "phonetapify-c6c06",
  storageBucket: "phonetapify-c6c06.appspot.com",
  messagingSenderId: "909905495327",
  appId: "1:909905495327:web:b2c7e1103464cc38a71c2a",
  measurementId: "G-8PYJBX3CTZ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
