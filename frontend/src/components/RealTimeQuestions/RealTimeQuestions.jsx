import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllQuestionsSuccess } from "../../redux/redux-thunk/allQuestionsState";
import { questionsCollections } from "../../utils/firebase-config";
import { onSnapshot } from "firebase/firestore";

const RealTimeQuestions = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onSnapshot(questionsCollections, (snapshot) => {
      dispatch(
        getAllQuestionsSuccess(
          snapshot.docs.map((doc) => ({
            category: "All Questions",
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};
export default RealTimeQuestions;
