import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useFormValidation from "../../../hooks/useFormValidation";
import { usePrevious } from "../../../hooks/usePrevious";
import { editAnswer } from "../../../data/inputs";
import { useSelector, useDispatch } from "react-redux";
import Inputs from "../Inputs/Inputs";
import MultiButton from "../Button/MultiButton";
import {
  updateAnswerFirebase,
  deleteAnswerFirebase,
} from "../../../redux/redux-thunk/singleQuestionState";

const AnswersModal = ({ show, setShow, commentId }) => {
  const [input, setInput] = useState(editAnswer);
  const dispatch = useDispatch();
  const { singleQuestion, answers } = useSelector(
    (state) => state.singleQuestion
  );

  const [changed, setChanged] = useState(false);

  const getSingleQuestion = answers.filter((single) => {
    return single.id === commentId;
  });

  const initialObject = {
    answer: getSingleQuestion[0].answer,
  };

  const previousData = usePrevious(getSingleQuestion[0].answer);

  const handleClose = () => {
    clearData();
    setShow(!show);
  };

  const dispatchEditComment = () => {
    const data = {
      answer: formData.answer,
      id: singleQuestion.id,
      commentId: getSingleQuestion[0].id,
    };
    dispatch(updateAnswerFirebase(data));
    setShow(false);
  };

  const { errors, formData, handleChange, handleSubmit, clearData } =
    useFormValidation("answer", initialObject, dispatchEditComment);

  useEffect(() => {
    if (previousData !== formData.answer) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [formData, changed]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Inputs
            {...input}
            value={formData[input.name]}
            handleChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <MultiButton
            roleClass="ask-question"
            disabled={changed}
            clickFunction={handleSubmit}
          >
            Update answer
          </MultiButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AnswersModal;
