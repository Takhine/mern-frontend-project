import React, { useEffect, useReducer } from "react";
import { validate } from "src/shared/util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  const handleChange = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const handleTouch = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        value={inputState.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChange}
        onBlur={handleTouch}
      />
    ) : (
      <textarea
        id={props.id}
        value={inputState.value}
        rows={props.rows || 3}
        onChange={handleChange}
        onBlur={handleTouch}
      />
    );

  useEffect(() => {
    props.onInput(props.id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
