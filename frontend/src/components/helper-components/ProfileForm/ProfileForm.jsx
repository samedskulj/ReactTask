import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { updateProfile } from "../../../data/inputs";
import Inputs from "../Inputs/Inputs";
import { usePrevious } from "../../../hooks/usePrevious";
import MultiButton from "../Button/MultiButton";
import { convertArray } from "../../../helper/convertArray";
import useFormValidation from "../../../hooks/useFormValidation";
import { updateUserFirebase } from "../../../redux/redux-thunk/userState";
import { useDispatch } from "react-redux";
import "./ProfileForm.css";

const ProfileForm = ({ user }) => {
  const object = convertArray(user);
  const handleUpdate = () => {};
  const [changed, setChanged] = useState(false);
  const [inputs, setInputs] = useState(updateProfile);
  const dispatch = useDispatch();
  //made a new custom hook to check if the data has been changed

  const previousData = usePrevious(object);

  const dispatchUpdateUser = () => {
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      id: object.id,
    };
    dispatch(updateUserFirebase(data));
  };

  const { errors, formData, handleChange, handleSubmit, clearData } =
    useFormValidation("updateProfile", object, dispatchUpdateUser);

  useEffect(() => {
    if (JSON.stringify(previousData) !== JSON.stringify(formData)) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [formData, changed]);

  return (
    <>
      {user !== null && (
        <Col lg="8">
          <h2 id="account-settings">Account Settings</h2>
          <form onSubmit={handleUpdate}>
            {inputs.map((input) => (
              <Col lg="12" key={input.id}>
                <Inputs
                  key={input.id}
                  {...input}
                  value={formData[input.name]}
                  handleChange={handleChange}
                />
              </Col>
            ))}
            <MultiButton
              roleClass="update"
              disabled={changed}
              type="submit"
              clickFunction={handleSubmit}
            >
              Update Profile
            </MultiButton>
          </form>
        </Col>
      )}
    </>
  );
};

export default ProfileForm;
