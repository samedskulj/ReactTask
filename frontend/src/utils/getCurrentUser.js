import { useState, useEffect } from "react";
import { authFirebase, usersCollections } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { getUserFromDatabase } from "./firebase-functions/firebase-functions";

export const useCurrentUser = () => {
  const [current, setCurrent] = useState();
  const currentUser = authFirebase.currentUser;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await getUserFromDatabase(currentUser.email);
      setCurrent(response);
    };
    fetchCurrentUser();
  }, []);

  return [current];
};
