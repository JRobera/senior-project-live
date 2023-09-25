const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { uploadToCloudinaryFile } = require("../services/cloudinary");

const employerSignUp = async (req, res) => {
  //   console.log(req.body);
  User.findOne({ Email: req.body.Email }).then((user) => {
    if (user) {
      return res.status(400).json("User already exists");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          throw err;
        }
        bcrypt.hash(req.body.Password, salt, function (err, hash) {
          if (err) {
            throw err;
          } else {
            User.create({
              Name: req.body.Name,
              Email: req.body.Email,
              Password: hash,
              isEmployer: true,
            })
              .then((result) => {
                const company = {
                  u_id: result._id,
                  u_name: result.Name,
                  u_email: result.Email,
                  u_pic: result.Picture,
                  u_title: result.Job_title,
                  u_isemployer: result.isEmployer,
                };

                const accessToken = jwt.sign(
                  company,
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "15m" }
                );
                const refreshToken = jwt.sign(
                  company,
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: "1d" }
                );
                User.updateOne(
                  { Email: result.Email },
                  { refreshToken: refreshToken }
                ).then((response) => {
                  // res.json(response);
                });
                res.cookie("empjwt", refreshToken, {
                  withCredentials: true,
                  maxAge: 24 * 60 * 60 * 1000,
                  httpOnly: true,
                });

                res.status(200).json({
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      });
    }
  });
};

const employerLogIn = (req, res) => {
  email = req.body.Email;
  password = req.body.Password;
  User.findOne({ Email: email }).then((foundCompany) => {
    if (foundCompany && foundCompany.isEmployer !== false) {
      if (foundCompany.isActive === true) {
        bcrypt.compare(password, foundCompany.Password, (err, result) => {
          if (result) {
            // respond with ecrypted data to cookie
            // and data for user state
            const company = {
              u_id: foundCompany._id,
              u_name: foundCompany.Name,
              u_email: foundCompany.Email,
              u_pic: foundCompany.Picture,
              u_title: foundCompany.Job_title,
              u_isemployer: foundCompany.isEmployer,
            };

            const accessToken = jwt.sign(
              company,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "15m",
              }
            );
            const refreshToken = jwt.sign(
              company,
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            User.updateOne(
              { Email: foundCompany.Email },
              { refreshToken: refreshToken }
            ).then((response) => {
              // console.log(response);
            });

            res.cookie("empjwt", refreshToken, {
              withCredentials: true,
              secure: true,
              sameSite: "none",
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            res
              .status(200)
              .json({ accessToken: accessToken, refreshToken: refreshToken });
          } else {
            res.json("Incorrect password!");
          }
        });
      } else {
        res.json("User is Blocked");
      }
    } else {
      res.status(401).json("User does not exists");
    }
  });
};

const erefresh = (req, res) => {
  const refreshToken = req.cookies.empjwt;
  if (!refreshToken) return res.status(401).json("You are not authenticated");
  User.findOne({ refreshToken: refreshToken }).then((result) => {
    if (result) {
      const newcompany = {
        u_id: result._id,
        u_name: result.Name,
        u_email: result.Email,
        u_pic: result.Picture,
        u_title: result.Job_title,
        u_isemployer: result.isEmployer,
      };
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, company) => {
          if (err) return res.sendStatus(403);
          const accessToken = jwt.sign(
            newcompany,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          // user && console.log(accessToken);
          res.json({ accessToken: accessToken });
        }
      );
    } else {
      // console.log("user " + reslut);
    }
    // console.log("THE cookie " + req.cookies.jwt);
  });
};

const elogOut = (req, res) => {
  res.clearCookie("empjwt", { httpOnly: true, path: "/" });
  res.status(200).json("User Logged out");
};

const editEmpProfile = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  const { newUserName, userJobTitle, aboutUser, userLocation, certifications } =
    req.body;
  if (
    newUserName !== "" &&
    userJobTitle !== "" &&
    aboutUser !== "" &&
    userLocation !== ""
  ) {
    User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Name: newUserName,
          Job_title: userJobTitle,
          About: aboutUser,
          Location: userLocation,
        },
      }
    ).then((response) => {});
  }

  certifications?.map((certification) => {
    if (certification !== null) {
      Certification.create({
        Name: certification?.name,
        Duration: certification?.duration,
        Description: certification?.description,
        User_id: req.params.id,
      })
        .then((response) => {
          User.updateOne(
            { _id: req.params.id },
            { $push: { Certification_id: response?._id } }
          ).then((response) => {});
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
};

const egetUserByEmail = async (req, res) => {
  await User.findOne({ Email: req.params.email, isEmployer: true }).then(
    (response) => {
      res.json(response);
    }
  );
};

const getJobposts = async (req, res) => {
  JobPost.find({ Company_id: req.params.id })
    .populate({ path: "Company_id", select: "Picture" })
    .then((response) => {
      res.json(response);
    });
};

const deleteJobPost = async (req, res) => {
  console.log(req.params);
  User.updateOne(
    { _id: req.params.userid },
    { $pull: { My_Job_id: req.params.postid } }
  )
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => {
      res.json(err);
    });

  JobPost.findOneAndRemove({ _id: req.params.postid })
    .then((response) => {
      res.json("Job Post Deleted");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  employerSignUp,
  employerLogIn,
  erefresh,
  elogOut,
  editEmpProfile,
  egetUserByEmail,
  getJobposts,
  deleteJobPost,
};
