import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as bootstrapCss from "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { server_url } from "../../config";
import { getToken } from "../../utility/localStorage";
import { Alert } from "@mui/material";
const BuyingModal = ({ coin, funds, price }) => {
  const [show, setShow] = useState(false);
  const [qtyToBuy, setQtyToBuy] = useState(funds / price);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [submitted, setSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      const { data } = await axios.post(
        `${server_url}/api/trade/`,
        {
          qtyToBuy,
          coin,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      // setSubmit(false)
      setMessage("Your trade has been created! you may close this window");
      console.log(data);
    } catch (e) {
      setMessage(
        "Oops, something went wrong, make sure you are not exceeding your funds limit"
      );
      setSubmit(false);
      console.log(e);
    }
  };
  //calculate the quatity user can buy
  //Send the information to the server
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Buy
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {!message ? null : <Alert severity="info">{message}</Alert>}

            <div className="inputField">
              <label>Name</label>
              <input value={coin} disabled={true} />
            </div>
            <div className="inputField">
              <label>Quantity</label>
              <input
                value={qtyToBuy}
                type="number"
                onChange={(e) => setQtyToBuy(+e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!submitted ? false : true}
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuyingModal;
