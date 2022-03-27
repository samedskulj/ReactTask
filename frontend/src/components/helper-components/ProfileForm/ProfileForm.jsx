import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { updateProfileInputs } from "../../../data/inputs";
import Inputs from "../Inputs/Inputs";
import { useSelector } from "react-redux";
import { usePrevious } from "../../../hooks/usePrevious";
import MultiButton from "../Button/MultiButton";

const ProfileForm = () => {
  const handleUpdate = () => {};

  const user = useSelector((state) => state.user.user);

  const [changed, setChanged] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
    email: user.email ? user.email : "",
  });

  if (user !== null) {
  }

  //made a new custom hook to check if the data has been changed

  const previousData = usePrevious(formData);

  useEffect(() => {
    if (previousData !== formData) {
      setChanged(true);
    }
  }, [formData, previousData]);

  return (
    <>
      <Col lg="8">
        <h2>Account Settings</h2>
        <form onSubmit={handleUpdate}>
          {updateProfileInputs.map((input) => (
            <Col lg="12" key={input.id}>
              <Inputs key={input.id} {...input} value={formData[input.name]} />
            </Col>
          ))}
          <MultiButton
            roleClass="update"
            disabled={changed === true}
            type="submit"
          >
            Update
          </MultiButton>
        </form>
      </Col>
    </>
  );
};

export default ProfileForm;
