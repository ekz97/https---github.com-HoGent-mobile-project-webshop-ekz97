import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;  
  } catch (error) {
    console.error('Registration error:', error);
    throw error;   
  }
};


export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;  
  } catch (error) {
    console.error('Login error:', error);
    throw error;  
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('Logged out successfully');
    return true;  
  } catch (error) {
    console.error('Logout error:', error);
    throw error;  
  }
};