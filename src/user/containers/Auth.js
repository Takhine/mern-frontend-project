import React, { useState } from "react";
import Button from "src/shared/components/FormElements/Button";
import Input from "src/shared/components/FormElements/Input";
import Card from "src/shared/components/UIElements/Card";
import { useForm } from "src/shared/hooks/useForm";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "src/shared/util/validators";
import "./Auth.css";

export default function Authenticate() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, onInputChange, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    console.log({ formState });
  };

  const handleAuthMode = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      <h2>Login required</h2>
      <hr />
      <form onSubmit={handleLoginSubmit}>
        {!isLoginMode && (
          <Input
            label="Your name"
            element="input"
            type="text"
            id="name"
            placeholder="Enter name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={onInputChange}
          />
        )}
        <Input
          id="email"
          label="E-mail"
          placeholder="Enter email"
          element="input"
          type="text"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={onInputChange}
        />
        <Input
          id="password"
          label="Password"
          placeholder="Enter password"
          element="input"
          type="password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter valid password, at least 5 characters"
          onInput={onInputChange}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Signup"}
        </Button>
      </form>
      <Button type="button" onClick={handleAuthMode}>
        Switch to {isLoginMode ? "Signup" : "Login"}
      </Button>
    </Card>
  );
}
