import React, { useState } from "react";
import { Button, UsersList } from "../helper-components";
import { topusers } from "../../data/topusers";
import { Col } from "react-bootstrap";
import "./TopUsers.css";

const TopUsers = () => {
  const [users, setUsers] = useState(topusers);

  return (
    <Col lg="3">
      <div className="top-users">
        <Button roleClass={"add-question"} text="Ask a Question"></Button>
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
