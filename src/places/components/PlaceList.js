import React from "react";
import Button from "src/shared/components/FormElements/Button";
import Card from "src/shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

export default function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found</h2>
          <Button to="/places/new">Share place?</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
}
