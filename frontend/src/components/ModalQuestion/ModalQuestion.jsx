import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { askQuestion } from "../../data/inputs";
import { Inputs, MultiButton } from "../helper-components";
import useFirebase from "../../hooks/useFirebase";

const ModalQuestion = ({ show, setShow }) => {
  const [inputs, setInputs] = useState(askQuestion);

  const initialObject = {
    question: "",
    title: "",
  };

  const { errors, formData, handleChange, handleSubmit, clearData } =
    useFirebase("addQuestion", initialObject);

  const handleClose = () => {
    clearData();
    setShow(!show);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inputs?.map((question) => {
            return (
              <Inputs
                key={question.id}
                {...question}
                value={formData[question.name]}
                handleChange={handleChange}
                error={errors[question.name]}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          {errors.credentials && <span>{errors.credentials}</span>}
          <MultiButton roleClass="ask-question" clickFunction={handleSubmit}>
            Submit a Question
          </MultiButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalQuestion;
