import React, { useContext } from "react";
import "./Pay.css";
function Pay({ fname, lname, email, amount, tx_ref, public_key }) {
  // const amount = 100;
  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value={public_key} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input
          type="hidden"
          name="amount"
          value={100}
          readOnly
          placeholder="100"
        />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input type="hidden" name="Ethionet" value="../../../public/images" />
        <input
          type="hidden"
          name="callback_url"
          value={`https://senior-project-live-api.onrender.com/payment-callback?tx_ref=${tx_ref}`}
        />
        <input
          type="hidden"
          name="return_url"
          // value="https://api.chapa.co/v1/hosted/pay"
          // value="http://localhost:3000/jobs"
          value={`https://senior-project-live-api.onrender.com/payment-callback?tx_ref=${tx_ref}`}
        />
        <input type="hidden" name="meta[title]" value="test" />
        <br />
        <button type="submit" className="btnPay">
          Pay Now
        </button>
      </form>
    </div>
  );
}

// import { AppContext } from "../../../context/AppContexts";
// function Pay({ fname, lname, email, amount, tx_ref, public_key, onPayClick }) {
//   const { user } = useContext(AppContext);

//   // const amount = 100;
//   return (
//     <div>
//       <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
//         <input type="hidden" name="public_key" value={public_key} />
//         <input type="hidden" name="tx_ref" value={tx_ref} />
//         <input
//           type="hidden"
//           name="amount"
//           value={100}
//           readOnly
//           placeholder="100"
//         />
//         <input type="hidden" name="currency" value="ETB" />
//         <input type="hidden" name="email" value={email} />
//         <input type="hidden" name="first_name" value={fname} />
//         <input type="hidden" name="last_name" value={lname} />
//         <input type="hidden" name="title" value="Let us do this" />
//         <input
//           type="hidden"
//           name="description"
//           value="Paying with Confidence with cha"
//         />
//         <input
//           type="hidden"
//           name="callback_url"
//           value={`https://senior-project-live-api.onrender.com/payment-callback?tx_ref=${tx_ref}`}
//         />
//         <input
//           type="hidden"
//           name="return_url"
//           // value="https://api.chapa.co/v1/hosted/pay"
//           // value="http://localhost:3000/jobs"
//           value={`https://senior-project-live-api.onrender.com/payment-callback?tx_ref=${tx_ref}`}
//         />

//         <input type="hidden" name="meta[title]" value="test" />
//         <br />
//         <button type="submit" className="btnPay">
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// }

export default Pay;
