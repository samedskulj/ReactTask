import {
  collection,
  addDoc,
  orderBy,
  limit,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  increment,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  firebaseDatabase,
  authFirebase,
  questionsCollections,
  usersCollections,
  reactionCollections,
} from "../firebase-config";

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
      question: formData.question,
      nameOfUser: formData.nameOfUser,
      userID: formData.userID,
      numberOfLikes: 0,
      numberOfComments: 0,
      createdAt: Timestamp.fromDate(new Date()),
    });
    return true;
  } catch (error) {
    return error.message;
  }
};
//getHot is a function that gets the hot questions from the database using the orderBy function, and query from the Firestore (firebase npm package)
//Since I did not have a time to finish the likes and dislikes functionality, I implemented hot questions with numberOfComments field to show that this method does work only for comments, not likes
export const getHot = async () => {
  const q = query(
    questionsCollections,
    orderBy("numberOfComments", "desc"),
    limit(10)
  );
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
    const updatedUserDocument = doc(usersCollections, formData.id);
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

    const document = doc(questionsCollections, formData.id);

    await updateDoc(document, {
      numberOfComments: increment(1),
    });

    await updateDoc(updatedUserDocument, {
      numberOfTimesCommented: increment(1),
    });

    return true;
  } catch (error) {
    return error.message;
  }
};
//Firebase function used to edit a comment in the question/:id page route
export const editComment = async (formData) => {
  try {
    const success = await updateDoc(
      doc(
        firebaseDatabase,
        "questions",
        formData.id,
        "answers",
        formData.commentId
      ),
      {
        answer: formData.answer,
      }
    );
    return true;
  } catch (error) {
    return error.message;
  }
};

//delete comment
export const deleteComment = async (formData) => {
  try {
    const success = await deleteDoc(
      doc(
        firebaseDatabase,
        "questions",
        formData.id,
        "answers",
        formData.commentId
      )
    );
    const document = doc(questionsCollections, formData.id);

    await updateDoc(document, {
      numberOfComments: increment(-1),
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

//Add like and dislike functionality
//DISCLAIMER: This functionality does work. It inputs the user and the post in collection called reactions
//Lack of time to implement it on frontend side to show correct way of liking and disliking, so that is why the buttons have been deleted in frontend side for like and dislike
//P.S: On my Github account I have app "SamkeChat" where I implemented the liking and disliking functionality

export const addLikes = async (formData) => {
  const { postId, userId, status } = formData;

  try {
    if (status === 1) {
      const success = await setDoc(
        doc(firebaseDatabase, "reactions", `${postId}:${userId}`),
        {
          status: 1,
        }
      );
      const document = doc(questionsCollections, formData.postId);

      await updateDoc(document, {
        numberOfLikes: increment(1),
      });
    } else if (status === undefined) {
      const success = await deleteDoc(
        doc(firebaseDatabase, "reactions", `${postId}:${userId}`)
      );
      const document = doc(questionsCollections, formData.postId);

      await updateDoc(document, {
        numberOfLikes: increment(-1),
      });
    }
  } catch (error) {
    return error.message;
  }
};

export const addDislikes = async (formData) => {
  const { postId, userId, status } = formData;

  try {
    if (status === 0) {
      const success = await setDoc(
        doc(firebaseDatabase, "reactions", `${postId}:${userId}`),
        {
          status: 0,
        }
      );
      const document = doc(questionsCollections, formData.postId);

      await updateDoc(document, {
        numberOfLikes: increment(-1),
      });
    } else if (status === undefined) {
      const success = await deleteDoc(
        doc(firebaseDatabase, "reactions", `${postId}:${userId}`)
      );
      const document = doc(questionsCollections, formData.postId);

      await updateDoc(document, {
        numberOfLikes: increment(1),
      });
    }
  } catch (error) {
    return error.message;
  }
};

export const resetPassword = async (formData) => {
  const { password, email, oldPassword } = formData;
  try {
    const credentials = EmailAuthProvider.credential(
      authFirebase.currentUser.email,
      oldPassword
    );

    await reauthenticateWithCredential(authFirebase.currentUser, credentials);
    const response = await updatePassword(authFirebase.currentUser, password);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const signOutUser = async () => {
  try {
    signOut(authFirebase).then(() => {
      console.log("radi");
    });
  } catch (error) {
    return error.message;
  }
};

export const getReactions = async () => {
  try {
    const response = await collection(reactionCollections);
    return response;
  } catch (error) {}
};
