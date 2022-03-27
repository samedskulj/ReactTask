import {
  collection,
  addDoc,
  orderBy,
  limit,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  firebaseDatabase,
  authFirebase,
  questionsCollections,
  usersCollections,
} from "../firebase-config";
import { useSelector } from "react-redux";

export const registerUser = async (formData) => {
  try {
    const response = await createUserWithEmailAndPassword(
      authFirebase,
      formData.email,
      formData.password
    );
    //Adding users to database so that we are able to get data easier and add more data
    const userDb = await addDoc(usersCollections, {
      email: response.user.email,
      token: response.user.accessToken,
      id: response.user.uid,
      firstName: formData.firstName
        ? formData.firstName
        : `User${response.uid}`,
      lastName: formData.lastName ? formData.lastName : `LastName`,
    });

    return new Promise((resolve, reject) => {
      resolve({ ...response.user });
    });
  } catch (error) {
    return error.message;
  }
};

export const getUserFromDatabase = async (email) => {
  try {
    const q = query(usersCollections, where("email", "==", email));
    const userData = await getDocs(q);
    const user = [];
    return new Promise((resolve, reject) => {
      userData.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
        resolve(user);
      });
    });
  } catch (error) {
    return error.message;
  }
};

export const loginUser = async (formData) => {
  try {
    const success = await signInWithEmailAndPassword(
      authFirebase,
      formData.email,
      formData.password
    );
    return success;
  } catch (error) {
    return error.message;
  }
};

export const addQuestion = async (formData, user) => {
  try {
    const success = await addDoc(collection(firebaseDatabase, "questions"), {
      title: formData.title,
      question: formData.title,
      username: user,
      numberOfLikes: 0,
      numberOfComments: 0,
    });
    return success;
  } catch (error) {
    return error.message;
  }
};

export const getHot = async () => {
  const q = query(questionsCollections, orderBy("thumbs", "desc"), limit(10));
  const docSnap = await getDocs(q);
  const hotQuestions = [];
  return new Promise((resolve, reject) => {
    docSnap.forEach((doc) => {
      hotQuestions.push({
        category: "Hot Questions",
        ...doc.data(),
        id: doc.id,
      });
      resolve(hotQuestions);
    });
  });
};

export const getTopUsers = async () => {
  const q = query(questionsCollections, orderBy("thumbs", "desc"), limit(10));
  const docSnap = await getDocs(q);
  const hotQuestions = [];
  return new Promise((resolve, reject) => {
    docSnap.forEach((doc) => {
      hotQuestions.push({ ...doc.data(), id: doc.id });
      resolve(hotQuestions);
    });
  });
};
