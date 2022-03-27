import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { updateProfileInputs } from "../../../data/inputs";
import Inputs from "../Inputs/Inputs";
import { usePrevious } from "../../../hooks/usePrevious";
import MultiButton from "../Button/MultiButton";
import { convertArray } from "../../../helper/convertArray";

const ProfileForm = ({ user }) => {
  const object = convertArray(user);

  const handleUpdate = () => {};
  const [changed, setChanged] = useState(false);
  const [formData, setFormData] = useState(object);

  //made a new custom hook to check if the data has been changed

  const previousData = usePrevious(object);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (JSON.stringify(previousData) === JSON.stringify(formData)) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [formData, changed]);

  return (
    <>
      {user !== null && (
        <Col lg="8">
          <h2>Account Settings</h2>
          <form onSubmit={handleUpdate}>
            {updateProfileInputs.map((input) => (
              <Col lg="12" key={input.id}>
                <Inputs
                  key={input.id}
                  {...input}
                  value={formData[input.name]}
                  handleChange={handleChange}
                />
              </Col>
            ))}
            <MultiButton roleClass="update" disabled={changed} type="submit">
              Update
            </MultiButton>
          </form>
        </Col>
      )}
    </>
  );
};

export default ProfileForm;
