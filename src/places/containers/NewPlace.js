import React from "react";
import Button from "src/shared/components/FormElements/Button";
import Input from "src/shared/components/FormElements/Input";
import { useForm } from "src/shared/hooks/useForm";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "src/shared/util/validators";
import "./PlaceForm.css";



export default function NewPlace() {
    const [formState, onInputChange] = useForm({
        title: {
          value: "",
          isValid: false,
        },
        description: {
          value: "",
          isValid: false,
        },
        address: {
          value: "",
          isValid: false,
        },
      }, false);

  const onPlaceSubmit = (event) => {
    event.preventDefault();
    //   API request
    console.log({ formState });
  };

  return (
    <form className="place-form" onSubmit={onPlaceSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={onInputChange}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={onInputChange}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={onInputChange}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add place
      </Button>
    </form>
  );
}
