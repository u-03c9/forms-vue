import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyBGQuFL1B6wy-2zLBPeNBXjzaGBL0Xfx-k",
  authDomain: "forms-vue.firebaseapp.com",
  projectId: "forms-vue",
  storageBucket: "forms-vue.appspot.com",
  messagingSenderId: "299142178029",
  appId: "1:299142178029:web:a4f41fa6c5056efbc198e4",
};

const app = initializeApp(config);

export function isUserAuthenticated(): boolean {
  return getAuth().currentUser ? true : false;
}
