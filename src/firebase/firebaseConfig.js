import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAdMg1oZLQuj-MHCvjlYcK9D355JxTdvOw",
  authDomain: "mobiledevelopmentx.firebaseapp.com",
  projectId: "mobiledevelopmentx",
  storageBucket: "mobiledevelopmentx.appspot.com",
  messagingSenderId: "124997601304",
  appId: "1:124997601304:web:96e5a1b6225896ff5bdb6d",
  measurementId: "G-35KVR2P1Z7"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);

export { auth, firestore };
