import React from "react";
import { useParams } from "react-router";
import Button from "src/shared/components/FormElements/Button";
import Input from "src/shared/components/FormElements/Input";
import { useForm } from "src/shared/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "src/shared/util/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

export default function UpdatePlace() {
  const { placeId } = useParams();

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  const [formState, onInputChange] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  const onPlaceUpdateSubmit = (event) => {
    event.preventDefault();
    //   API request
    console.log({ formState });
  };


  return (
    <form className="place-form" onSubmit={onPlaceUpdateSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={onInputChange}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={onInputChange}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
}
