import React, { useState } from "react";
import Pay from "../Pay";
import "./SecondForm.css";
import "../PostForm.css";
function SecondForm({ formData, setFormData }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(50);
  // const tx_ref = `${fname}-tx-131220`;
  const tx_ref = `${fname}-tx-141220`;
  // const public_key = "CHAPUBK_TEST-YWlAPkHhulw9SVL8WIRR6II1usaAZJyD";
  const public_key = "CHAPUBK_TEST-JxC5BwlhntXGZNEGIHu9JTAYC9acOhjj";

  console.log(fname);
  console.log(email);

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="second-form-page">
      <h3>Pay now and Post your job now</h3>
      <div className="payment-input-wrapper">
        <label htmlFor="fname">First name</label>

        <input
          placeholder="Enter First Name"
          // value={formData.fname}
          onChange={(e) => {
            setFname(e.target.value);
          }}
          type="text"
          id="fname"
        />
      </div>

      <div className="payment-input-wrapper">
        <label htmlFor="lname">Last name</label>

        <input
          placeholder="Enter Last Name"
          // value={formData.lname}
          onChange={(e) => {
            setLname(e.target.value);
          }}
          type="text"
          id="lname"
        />
      </div>

      <div className="payment-input-wrapper">
        <label htmlFor="email">Email</label>

        <input
          placeholder="Enter Email"
          // value={formData.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="email"
        />
      </div>

      <div className="payment-input-wrapper">
        <label htmlFor="amount">Amount</label>

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
