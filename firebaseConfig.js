import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc4UAiAxGu8YjSftnb3TK28htRc15x4CU",
  authDomain: "techeventsmw.firebaseapp.com",
  projectId: "techeventsmw",
  storageBucket: "techeventsmw.appspot.com",
  messagingSenderId: "432277969474",
  appId: "1:432277969474:web:33e24fdf9664831fa7ebdb",
  measurementId: "G-5HN7S9DLJ9",
};
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
