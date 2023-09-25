import React, { useContext, useState } from "react";
import Pay from "../Pay";
import "./SecondForm.css";
import "../PostForm.css";
import { AppContext } from "../../../../context/AppContexts";
import { v4 as uuid } from "uuid";

function SecondForm({ formData, setFormData }) {
  const { content } = useContext(AppContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(50);
  // const tx_ref = `${fname}-tx-131220`;
  const tx_ref = `${uuid()}-tx-141220`;
  // const public_key = "CHAPUBK_TEST-YWlAPkHhulw9SVL8WIRR6II1usaAZJyD";
  const public_key = "CHAPUBK_TEST-JxC5BwlhntXGZNEGIHu9JTAYC9acOhjj";

  console.log(fname);
  console.log(email);

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="second-form-page">
      <h3>{content.paynowandpostyourjobnow}</h3>
      <div className="payment-input-wrapper">
        <label htmlFor="fname">{content.name}</label>

        <input
          placeholder={content.name}
          // value={formData.fname}
          onChange={(e) => {
            setFname(e.target.value);
          }}
          type="text"
          id="fname"
        />
      </div>

      <div className="payment-input-wrapper">
        <label htmlFor="lname">{content.lname}</label>

        <input
          placeholder={content.lname}
          // value={formData.lname}
          onChange={(e) => {
            setLname(e.target.value);
          }}
          type="text"
          id="lname"
        />
      </div>

      <div className="payment-input-wrapper">
        <label htmlFor="email">{content.email}</label>

        <input
          placeholder={content.enteremail}
          // value={formData.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="email"
        />
      </div>

      <div className="payment-input-wrapper">
        <label htmlFor="amount">{content.amount}</label>

        <input
          // placeholder="Enter Amount"
          // value={formData.amount}
          onChange={(e) => {
            setAmount(100);
          }}
          type="number"
          id="amount"
          readOnly
          placeholder="100"
        />
      </div>

      <Pay
        fname={fname}
        lname={lname}
        email={email}
        amount={amount}
        tx_ref={tx_ref}
        public_key={public_key}
      />
    </div>
  );
}

export default SecondForm;
