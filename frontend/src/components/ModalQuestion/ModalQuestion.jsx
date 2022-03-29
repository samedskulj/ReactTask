import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { askQuestion } from "../../data/inputs";
import { Inputs, MultiButton } from "../helper-components";
import useFormValidation from "../../hooks/useFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionFirebase } from "../../redux/redux-thunk/allQuestionsState";

const ModalQuestion = ({ show, setShow }) => {
  const [inputs, setInputs] = useState(askQuestion);
  const dispatch = useDispatch();

  const initialObject = {
    question: "",
    title: "",
  };

  const user = useSelector((state) => state.user);

  const dispatchAddQuestion = () => {
    const data = {
      question: formData.question,
      title: formData.title,
      nameOfUser: user.user[0].firstName,
      userID: user.user[0].id,
    };
    if (user.user.length !== 0) {
      dispatch(addQuestionFirebase(data));
      setShow(false);
    }
  };

  const { errors, formData, handleChange, handleSubmit, clearData } =
    useFormValidation("addQuestion", initialObject, dispatchAddQuestion);

  const handleClose = () => {
    clearData();
    setShow(!show);
  };

  return (
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
  );
};

export default ModalQuestion;
