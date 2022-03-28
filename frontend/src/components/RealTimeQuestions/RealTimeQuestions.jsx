import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllQuestionsSuccess,
  resetAllQuestions,
} from "../../redux/redux-thunk/allQuestionsState";
import { questionsCollections } from "../../utils/firebase-config";
import {
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { MultiButton } from "../helper-components";

const RealTimeQuestions = ({ children }) => {
  const [lastDocument, setLastDocument] = useState();
  const [isEmpty, setIsEmpty] = useState();
  const [firstLoad, setFirstLoad] = useState(true);
  const [paginateQuery, setPaginateQuery] = useState(
    query(questionsCollections, orderBy("createdAt", "desc"), limit(3))
  );

  const handlePaginate = () => {
    setPaginateQuery(
      query(
        questionsCollections,
        orderBy("createdAt", "desc"),
        startAfter(lastDocument),
        limit(3)
      )
    );
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstLoad) {
      dispatch(resetAllQuestions());
    }
    const unsubscribe = onSnapshot(paginateQuery, (snapshot) => {
      setFirstLoad(false);
      setIsEmpty(snapshot.size === 0);
      setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
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
  }, [dispatch, paginateQuery]);

  return (
    <>
      <div>{children}</div>
      {!isEmpty && (
        <MultiButton roleClass="paginate" clickFunction={handlePaginate}>
          Load More
        </MultiButton>
      )}
    </>
  );
};
export default RealTimeQuestions;
