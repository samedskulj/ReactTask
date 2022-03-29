import React, { useState, useEffect } from "react";
import { MultiButton, UsersList } from "../helper-components";
import { Col } from "react-bootstrap";
import "./TopUsers.css";
import ModalQuestion from "../ModalQuestion/ModalQuestion";
import { useDispatch, useSelector } from "react-redux";
import { getTopUsersFirebase } from "../../redux/redux-thunk/topUsersState";
import AuthorizedComponent from "../../helper/AuthorizedComponent";

const TopUsers = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const { topUsers } = useSelector((state) => state.topUsers);

  useEffect(() => {
    dispatch(getTopUsersFirebase());
  }, [dispatch]);

  return (
    <Col lg="3">
      <div className="top-users">
        <AuthorizedComponent>
          <div className="top-users__add">
            <MultiButton roleClass={"add-question"} clickFunction={handleShow}>
              Ask a Question
            </MultiButton>
          </div>
        </AuthorizedComponent>
        <ModalQuestion show={show} setShow={setShow} />
        <div className="top-users__section">
          <h2>Top Users</h2>
          {topUsers?.map((user) => (
            <UsersList key={user.id} user={user} />
          ))}
        </div>
      </div>
    </Col>
  );
};

export default TopUsers;
