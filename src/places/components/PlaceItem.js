import React, { useState } from "react";
import Button from "src/shared/components/FormElements/Button";
import Card from "src/shared/components/UIElements/Card";
import Map from "src/shared/components/UIElements/Map";
import Modal from "src/shared/components/UIElements/Modal";
import "./PlaceItem.css";

export default function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  const showDeleteWarning = () => setShowConfirmModal(true);

  const cancelDeleteWarning = () => setShowConfirmModal(false);

  const confirmDelete = () => {
    setShowConfirmModal(false);
    console.log("Delete");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={() => closeMap()}>Close</Button>}
      >
        <div className="map-container">
          <Map />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarning}
        header="Are you sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={() => cancelDeleteWarning()} inverse>
              Cancel
            </Button>
            <Button onClick={() => confirmDelete()} danger>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              View on map
            </Button>
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger onClick={showDeleteWarning}>
              Delete
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}
