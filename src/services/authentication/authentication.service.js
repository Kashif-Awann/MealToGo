import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const loginRequest = (email, password) => {
  const auth = getAuth(); // Ensure you are initializing Firebase Auth
  return signInWithEmailAndPassword(auth, email, password); // Return the Promise
};
