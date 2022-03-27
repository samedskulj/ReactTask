import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { updateProfileInputs } from "../../../data/inputs";
import Inputs from "../Inputs/Inputs";
import { usePrevious } from "../../../hooks/usePrevious";
import MultiButton from "../Button/MultiButton";

const ProfileForm = ({ user }) => {
  const handleUpdate = () => {};
  const [changed, setChanged] = useState(false);

  const initialState = {};
  if (user) {
    initialState.firstName = user.firstName;
    initialState.email = user.email;
    initialState.lastName = user.lastName;
  }

  const [formData, setFormData] = useState(initialState);

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
