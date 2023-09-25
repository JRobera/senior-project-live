const axios = require("axios");

const verifyPayment = async (tx_ref) => {
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: "Bearer CHASECK_TEST-RXQrK2PYh1VPR8SD7UTFRthcNxWdtNYT",
        },
      }
    );

    const transaction = response.data.data;
    return transaction.status === "success";
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while verifying the payment.");
  }
};

module.exports = { verifyPayment };
