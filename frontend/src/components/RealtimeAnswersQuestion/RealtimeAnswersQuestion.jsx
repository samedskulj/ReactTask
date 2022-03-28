import React, { useEffect } from "react";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleQuestionSuccess,
  getSingleQuestionAnswersSuccess,
} from "../../redux/redux-thunk/singleQuestionState";
import { firebaseDatabase } from "../../utils/firebase-config";

const RealtimeAnswersQuestion = ({ children }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const questionDocument = doc(firebaseDatabase, "questions", id);
  const answersDocument = collection(
    firebaseDatabase,
    "questions",
    id,
    "answers"
  );

  useEffect(() => {
    const unsubscribeQuestion = onSnapshot(questionDocument, (snapshot) => {
      dispatch(
        getSingleQuestionSuccess({ ...snapshot.data(), id: snapshot.id })
      );
    });

    const unsubscribeAnswers = onSnapshot(answersDocument, (snapshot) => {
      dispatch(
        getSingleQuestionAnswersSuccess(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });
    return () => {
      unsubscribeQuestion();
      unsubscribeAnswers();
    };
  }, []);

  return <>{children}</>;
};

export default RealtimeAnswersQuestion;
