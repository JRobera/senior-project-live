const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sendPasswordResetEmail = async (req, res) => {
  const { resetEmail } = req.body;

  User.findOne({ Email: resetEmail })
    .then((response) => {
      if (response) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NODEMAILERUSER,
            pass: process.env.NODEMAILERPASS,
          },
        });

        const secret = process.env.ACCESS_TOKEN_SECRET + response.Password;
        const user = { email: response.Email, id: response._id };
        const token = jwt.sign(user, secret, { expiresIn: "15m" });
        const resetLink = `http://localhost:3005/reset-password/${token}/${response._id}`;

        const mailOptions = {
          from: process.env.NODEMAILERUSER,
          to: resetEmail,
          subject: "Password Reset Request",
          // text: "resetLink",
          html: `<p>Click<strong><a href="${resetLink}"> here </a></strong>to reset your password.</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json(error);
          } else {
            res.json("Check your email for password reset link");
          }
        });
      } else {
        res.json("User not registered");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const verifyResetPasswordLink = async (req, res) => {
  const { token, id } = req.params;
  User.findOne({ _id: id })
    .then((response) => {
      if (response) {
        const secret = process.env.ACCESS_TOKEN_SECRET + response.Password;
        try {
          jwt.verify(token, secret, (err, user) => {
            if (err) return res.sendStatus(403);
            res.redirect(
              `https://habesha-net.onrender.com/reset-password/${token}/${id}`
            );
          });
        } catch (error) {
          res.json(error.message);
        }
      } else {
        res.json("Invalid user");
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
};

const setNewPassword = async (req, res) => {
  const { token, id } = req.params;
  const { newpass } = req.body;

  User.findOne({ _id: id })
    .then((response) => {
      if (response) {
        const secret = process.env.ACCESS_TOKEN_SECRET + response.Password;
        jwt.verify(token, secret, (err, user) => {
          if (err) return res.sendStatus(403);
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            }
            bcrypt.hash(newpass, salt, (err, hash) => {
              if (err) {
                throw err;
              } else {
                User.updateOne({ _id: id }, { Password: hash }).then(
                  (response) => {
                    if (response) {
                      res.json("Password Updated successfully!");
                    }
                  }
                );
              }
            });
          });
        });
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = {
  sendPasswordResetEmail,
  verifyResetPasswordLink,
  setNewPassword,
};
