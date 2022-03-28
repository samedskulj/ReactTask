import React, { useState, useEffect } from "react";
import { MultiButton, UsersList } from "../helper-components";
import { topusers } from "../../data/topusers";
import { Col } from "react-bootstrap";
import "./TopUsers.css";
import ModalQuestion from "../ModalQuestion/ModalQuestion";
import { useDispatch, useSelector } from "react-redux";
import { getTopUsersFirebase } from "../../redux/redux-thunk/topUsersState";

const TopUsers = () => {
  const [users, setUsers] = useState(topusers);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const { topUsers } = useSelector((state) => state.topUsers);
  useEffect(() => {
    dispatch(getTopUsersFirebase());
  }, [dispatch]);

  console.log(topUsers);

  return (
    <Col lg="3">
      <div className="top-users">
        <MultiButton roleClass={"add-question"} clickFunction={handleShow}>
          Ask a Question
        </MultiButton>
        <ModalQuestion show={show} setShow={setShow} />
        <div className="top-users__section">
          <h2>Top Users</h2>
          {users?.map((user) => (
            <UsersList key={user.id} user={user} />
          ))}
        </div>
      </div>
    </Col>
  );
};

export default TopUsers;
