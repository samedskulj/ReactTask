import { collection, addDoc, onSnapshot } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseDatabase, authFirebase } from "../firebase-config";

export const registerUser = async (formData) => {
  let error;
  try {
    const response = await createUserWithEmailAndPassword(
      authFirebase,
      formData.email,
      formData.password
    );
    return response;
  } catch (error) {
    error = error.message;
    return error;
  }
};

export const loginUser = async (formData) => {
  let error;
  try {
    const success = await signInWithEmailAndPassword(
      authFirebase,
      formData.email,
      formData.password
    );
    return success;
  } catch (error) {
    error = error.message;
    return error;
  }
};

export const addQuestion = async (formData) => {
  let error;
  try {
    const success = await addDoc(
      collection(firebaseDatabase, "questions"),
      formData
    );
    return success;
  } catch (error) {
    error = error.message;
    return error;
  }
};

export const getQuestions = () => {
  var questions = [];
  onSnapshot(collection(firebaseDatabase, "questions"), (querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      if (doc.data() !== null) {
        questions.push(doc.data());
      }
      console.log(doc.data());
    });
  });
  return questions;
};
