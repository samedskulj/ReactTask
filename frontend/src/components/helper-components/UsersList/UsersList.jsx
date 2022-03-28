import React from "react";
import "./UsersList.css";
import { AiOutlineArrowUp } from "react-icons/ai";
import { DefaultIMG } from "../../../images";
const UsersList = ({ user }) => {
  return (
    <>
      <div className="top-users__list">
        <div className="top-users__info">
          <img src={DefaultIMG} />
          <p id="top-users__name">{user.firstName}</p>
        </div>
        <div className="top-users__score">
          <p>{user.numberOfTimesCommented}</p>
          <AiOutlineArrowUp />
        </div>
      </div>
    </>
  );
};

export default UsersList;
