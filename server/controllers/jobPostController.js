const mongoose = require("mongoose");
const JobPost = require("../models/jobPostModel");
const { verifyPayment } = require("./api");
const { response } = require("express");

const newJobPost = async (req, res) => {
  //   const { Job_title, Job_description } = req.body;
  // console.log(req.body);

  try {
    //   skills: [],
    const userId = req.params.id;
    // Create a new instance of the JobPost model with the provided data
    const jobPost = new JobPost({
      ...req.body,
      Company_id: new mongoose.Types.ObjectId(userId),
    });

    // Save the job post to the database
    const savedJobPost = await jobPost.save();

    // Return the saved job post in the response
    res.status(200).json(savedJobPost);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error occurred:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ message: "Failed to create job post" });
  }
};

const paymentCallback = async (req, res) => {
  const tx_ref = req.query.tx_ref;
  try {
    // Call verifyPayment function to verify the payment status
    const paymentStatus = await verifyPayment(tx_ref);

    // TODO: TRY WITH THIS
    // if (paymentStatus === 'success') {
    if (paymentStatus) {
      // Payment was successful
      // You can now store the user's inputs in your database
      // Return a success response to the user
      // res.send("Payment successful. Job posted successfully.");
      // res.redirect("https://habesha-net.onrender.com/payment-success");
      // res.redirect("https://habesha-net.onrender.com/jobs?showModal=true");
      res.redirect(
        "https://habesha-net.onrender.com/emp/jobs?showModal=true&paymentSuccess=true"
      );
    } else {
      // Payment was not successful
      // Handle unsuccessful payment
      // Return a failure response to the user
      // res.send("Payment failed. Job post failed.");
      res.redirect("https://habesha-net.onrender.com/payment-failure");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while verifying the payment.");
  }
  // Verify the payment status using the provided transaction reference (tx_ref)
  // try {
  //   const response = await axios.get(
  //     `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
  //     {
  //       headers: {
  //         "Authorization": "Bearer CHASECK_TEST-RXQrK2PYh1VPR8SD7UTFRthcNxWdtNYT",
  //       },
  //     }
  //   );
  //   const transaction = response.data.data;
  //   if (transaction.status === "success") {
  //     // Payment was successful
  //     // You can now store the user's inputs in your database
  //     // Return a success response to the user
  //     res.send("Payment successful. Job posted successfully.");
  //   } else {
  //     // Payment was not successful
  //     // Handle unsuccessful payment
  //     // Return a failure response to the user
  //     res.send("Payment failed. Job post failed.");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("An error occurred while verifying the payment.");
  // }
};

// const paymentCallback = async (req, res) => {
//   const tx_ref = req.query.tx_ref;
//   const user_id = req.query.user_id;
//   try {
//     // Call verifyPayment function to verify the payment status
//     const paymentStatus = await verifyPayment(tx_ref);

//     if (paymentStatus) {
//       // Payment was successful
//       // Retrieve the job post data from the session
//       const jobPostData = req.session.jobPostData;

//       // Add the user ID to the job post data
//       jobPostData.user_id = user_id;

//       // Create a new instance of the JobPost model with the provided data
//       const jobPost = new JobPost(jobPostData);

//       // Save the job post to the database
//       const savedJobPost = await jobPost.save();

//       // Clear the job post data from the session
//       req.session.jobPostData = null;

//       // Redirect the user to the /payment-success page
//       res.redirect("/payment-success");
//       console.log(req.session);
//     } else {
//       // Payment was not successful
//       // Handle unsuccessful payment
//       // Redirect the user to the /payment-failure page
//       res.redirect("/payment-failure");
//       console.log(req.session);
//     }
//   } catch (error) {
//     console.error(error);
//     console.log(req.session);
//     res
//       .status(500)
//       .send(
//         "An error occurred while verifying the payment. this is from jobPostController.js"
//       );
//   }
// };

const getJobPosts = async (req, res) => {
  JobPost.find({})
    .populate("Company_id")
    .sort({ $natural: -1 })
    .then((response) => {
      res.json(response);
    });
};

const getSelectedPost = async (req, res) => {
  JobPost.findOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
};

const getApplicants = async (req, res) => {
  JobPost.findOne({ _id: req.params.id })
    .select("Job_title Applicants")
    .populate({
      path: "Applicants",
      populate: "userid",
    })
    .then((response) => {
      res.json(response);
    });
};

module.exports = {
  newJobPost,
  paymentCallback,
  getJobPosts,
  getSelectedPost,
  getApplicants,
};
// module.exports = { paymentCallback };
