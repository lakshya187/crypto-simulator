import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { server_url } from "../../config";
import { getToken } from "../../utility/localStorage";
import { Alert } from "@mui/material";
const SellingModal = ({ currentPrice, trade, quantity, priceBought }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [submitted, setSubmit] = useState(false);
  const [message, setMessage] = useState(null);
  const [qtyToSell, setQtyToSell] = useState(null);
  const handleSubmit = async () => {
    try {
      setSubmit(true);
      const { data } = await axios.patch(
        `${server_url}/api/trade/${trade}`,
        {
          data: {
            quantity: qtyToSell,
            price: currentPrice,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      // setSubmit(false)
      setMessage("Sold successfully! you may close this window. ");
      console.log(data);
    } catch (e) {
      setMessage(
        "Oops, something went wrong, make sure you are not exceeding your funds limit"
      );
      setSubmit(false);
      console.log(e);
    }
  };
  console.log(currentPrice);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sell
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sell your holdings!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {!message ? null : <Alert severity="info">{message}</Alert>}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sellingModalDetials">
                <div className="sellingModalDetials">
                  Buying Price {priceBought}
                </div>
                <div className="sellingModalDetials">
                  Quantity Holding : {quantity}
                </div>
              </div>
            </div>
            <div className="inputField">
              <label>Current Price</label>
              <input value={`₹${currentPrice}`} disabled={true} />
            </div>
            <div className="inputField">
              <label>Quantity</label>
              <input
                value={qtyToSell}
                type="number"
                onChange={(e) => setQtyToSell(+e.target.value)}
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

export default SellingModal;
