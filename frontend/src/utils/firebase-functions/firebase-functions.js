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
      numberOfTimesCommented: 0,
    });

    const registered = await response;
    return registered.user;
  } catch (error) {
    return error.code;
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
    const loggedIn = await success;
    return success.user;
  } catch (error) {
    return error.message;
  }
};

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

export const changeProfileData = async (formData) => {
  const { email, firstName, lastName } = formData;
  const currentUser = authFirebase.currentUser;
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

export const addComment = async (formData) => {
  try {
    const success = await addDoc(
      collection(firebaseDatabase, "questions", formData.id, "answers"),
      {
        answer: "test",
      }
    );
    return true;
  } catch (error) {
    return error.message;
  }
};
