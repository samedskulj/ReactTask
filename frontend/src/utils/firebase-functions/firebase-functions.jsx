import { collection, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseDatabase, authFirebase } from "../firebase-config";

export const getQuestions = async () => {
  const questions = await getDocs(collection(firebaseDatabase, "questions"));
  return questions.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const registerUser = async (formData) => {
  let error;
  const user = await createUserWithEmailAndPassword(
    authFirebase,
    formData.email,
    formData.password
  ).catch((err) => (error = err.message));

  if (error) {
    return error;
  } else {
    return user.user;
  }
};

export const loginUser = async (formData) => {
  let error;
  const user = await signInWithEmailAndPassword(
    authFirebase,
    formData.email,
    formData.password
  ).catch((err) => (error = err.message));
  if (error) {
    return error;
  } else {
    return user.user;
  }
};
