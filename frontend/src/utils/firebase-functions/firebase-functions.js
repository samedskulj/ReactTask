import {
  collection,
  addDoc,
  orderBy,
  limit,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  increment,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  firebaseDatabase,
  authFirebase,
  questionsCollections,
  usersCollections,
} from "../firebase-config";

const currentUser = authFirebase.currentUser;

//One place for all of the firebase functions

//formData is an object, not an array. The function for registering the user, and adding the user to the database
export const registerUser = async (formData) => {
  try {
    const response = await createUserWithEmailAndPassword(
      authFirebase,
      formData.email,
      formData.password
    );
    const userDb = await addDoc(usersCollections, {
      email: response.user.email,
      token: response.user.accessToken,
      id: response.user.uid,
      firstName: formData.firstName
        ? formData.firstName
        : `User${response.uid}`,
      lastName: formData.lastName ? formData.lastName : `LastName`,
      numberOfTimesCommented: 0,
    });

    const registered = await response;
    return registered.user;
  } catch (error) {
    return error.code;
  }
};
//getUserFromDatabase is a function that gets the user from the database
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
//loginUser is a function that logs the user in
export const loginUser = async (formData) => {
  try {
    const success = await signInWithEmailAndPassword(
      authFirebase,
      formData.email,
      formData.password
    );
    const loggedIn = await success;
    return success.user;
  } catch (error) {
    return error.message;
  }
};
//addQuestion is a function that adds a question to the database
export const addQuestion = async (formData) => {
  try {
    const success = await addDoc(collection(firebaseDatabase, "questions"), {
      title: formData.title,
      question: formData.title,
      nameOfUser: formData.nameOfUser,
      userID: formData.userID,
      numberOfLikes: 0,
      numberOfComments: 0,
    });
    return true;
  } catch (error) {
    return error.message;
  }
};
//getHot is a function that gets the hot questions from the database using the orderBy function, and query from the Firestore (firebase npm package)
export const getHot = async () => {
  const q = query(questionsCollections, orderBy("thumbs", "desc"), limit(10));
  const docSnap = await getDocs(q);
  const hotQuestions = [];

  const responses = docSnap.forEach((doc) => {
    hotQuestions.push({
      category: "Hot Questions",
      ...doc.data(),
      id: doc.id,
    });
  });

  const hot = await hotQuestions;
  return hot;
};
// getTopUsers is a function that gets the top users from the database
export const getTopUsers = async () => {
  const q = query(
    usersCollections,
    orderBy("numberOfTimesCommented", "desc"),
    limit(5)
  );
  const docSnap = await getDocs(q);
  const topUsers = [];
  const response = docSnap.forEach((doc) => {
    topUsers.push({ ...doc.data(), id: doc.id });
  });

  const responseUsers = await topUsers;
  return responseUsers;
};
// changeProfileData changes the data of the user and then we update the database collection which is holiding the users data
export const changeProfileData = async (formData) => {
  const { email, firstName, lastName } = formData;

  try {
    await updateProfile(authFirebase, {
      email: email,
    });
    const updatedUserDocument = doc(usersCollections, currentUser.email);
    await updateDoc(updatedUserDocument, {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    return true;
  } catch (error) {
    return error.message;
  }
};
//addComment is a function which is used to add a comment to the database

export const addComment = async (formData) => {
  try {
    const success = await addDoc(
      collection(firebaseDatabase, "questions", formData.id, "answers"),
      {
        answer: formData.answer,
        nameOfUser: formData.nameOfUser,
        userID: formData.userID,
      }
    );
    const updatedUserDocument = doc(usersCollections, formData.userID);

    await updateDoc(updatedUserDocument, {
      numberOfTimesCommented: increment(1),
    });

    return true;
  } catch (error) {
    return error.message;
  }
};

//getUsersQuestions is a function to get the users questions from the database
export const getUsersQuestions = async (userId) => {
  const q = query(questionsCollections, where("userID", "==", userId));
  const docSnap = await getDocs(q);
  const questions = [];
  const response = docSnap.forEach((doc) => {
    questions.push({ ...doc.data(), id: doc.id });
  });

  const responseQuestions = await questions;
  return responseQuestions;
};
