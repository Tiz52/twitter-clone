import {initializeApp, getApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFmPmwMXf3S6jUT54TNCAN0dT2Dgly7ZA",
  authDomain: "twitter-clone-fec65.firebaseapp.com",
  projectId: "twitter-clone-fec65",
  storageBucket: "twitter-clone-fec65.appspot.com",
  messagingSenderId: "849886156549",
  appId: "1:849886156549:web:d9c6a0d38eac7d3556896c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export default {
  app,
  db,
  storage,
};
