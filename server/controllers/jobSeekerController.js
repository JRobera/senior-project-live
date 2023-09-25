const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");

const { response } = require("express");

const signInGoogle = async (req, res) => {
  User.findOne({ Email: req.body.Email }).then((response) => {
    console.log(req.body);
    // User.create({
    //   Name: req.body.Name,
    //   Email: req.body.Email,
    //   Picture: req.body.Picture,
    //   isEmployer: false,
    // })
    //   .then((result) => {
    //     const user = {
    //       u_id: result._id,
    //       u_name: result.Name,
    //       u_email: result.Email,
    //       u_pic: result.Picture,
    //       u_title: result.Job_title,
    //     };

    //     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //       expiresIn: "15m",
    //     });
    //     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    //       expiresIn: "1d",
    //     });
    //     User.updateOne(
    //       { Email: result.Email },
    //       { refreshToken: refreshToken }
    //     ).then((response) => {
    //       // res.json(response);
    //     });
    //     res.cookie("jwt", refreshToken, {
    //       withCredentials: true,
    //       maxAge: 24 * 60 * 60 * 1000,
    //       httpOnly: true,
    //     });

    //     res.status(200).json({
    //       accessToken: accessToken,
    //       refreshToken: refreshToken,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });
};

const signUp = async (req, res) => {
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
              isEmployer: false,
            })
              .then((result) => {
                const user = {
                  u_id: result._id,
                  u_name: result.Name,
                  u_email: result.Email,
                  u_pic: result.Picture,
                  u_title: result.Job_title,
                  u_isemployer: result.isEmployer,
                };

                const accessToken = jwt.sign(
                  user,
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "15m" }
                );
                const refreshToken = jwt.sign(
                  user,
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: "1d" }
                );
                User.updateOne(
                  { Email: result.Email },
                  { refreshToken: refreshToken }
                ).then((response) => {
                  // res.json(response);
                });
                res.cookie("jwt", refreshToken, {
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

const logIn = (req, res) => {
  email = req.body.Email;
  password = req.body.Password;
  User.findOne({ Email: email }).then((foundUser) => {
    if (foundUser && foundUser.isEmployer !== true) {
      if (foundUser.isActive === true) {
        bcrypt.compare(password, foundUser.Password, (err, result) => {
          if (result) {
            // respond with ecrypted data to cookie
            // and data for user state
            const user = {
              u_id: foundUser._id,
              u_name: foundUser.Name,
              u_email: foundUser.Email,
              u_pic: foundUser.Picture,
              u_title: foundUser.Job_title,
              u_isemployer: foundUser.isEmployer,
            };

            const accessToken = jwt.sign(
              user,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "15m",
              }
            );
            const refreshToken = jwt.sign(
              user,
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            User.updateOne(
              { Email: foundUser.Email },
              { refreshToken: refreshToken }
            ).then((response) => {
              // console.log(response);
            });

            res.cookie("jwt", refreshToken, {
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
// refresh accessToken
const refresh = (req, res) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) return res.status(401).json("You are not authenticated");
  User.findOne({ refreshToken: refreshToken }).then((reslut) => {
    if (reslut?.isActive === true) {
      const newuser = {
        u_id: reslut._id,
        u_name: reslut.Name,
        u_email: reslut.Email,
        u_pic: reslut.Picture,
        u_title: reslut.Job_title,
        u_isemployer: reslut.isEmployer,
      };
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);
          const accessToken = jwt.sign(
            newuser,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          // user && console.log(accessToken);
          res.json({ accessToken: accessToken });
        }
      );
    } else {
      res.redirect("/");
    }
    // console.log("THE cookie " + req.cookies.empjwt);
  });
};

const logOut = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, path: "/" });
  res.status(200).json("User Logged out");
};

const getUsers = async (req, res) => {
  await User.find({ Email: { $ne: req.params.email } }).then((response) => {
    res.json(response);
  });
};

const getUserByEmail = async (req, res) => {
  await User.findOne({ Email: req.params.email, isEmployer: false }).then(
    (response) => {
      res.json(response);
    }
  );
};

const deleteExp = async (req, res) => {
  Experience.findOneAndRemove({ _id: req.params.id }).then((response) => {});
};

const deleteEdu = async (req, res) => {
  Education.findOneAndRemove({ _id: req.params.id }).then((response) => {});
};

const deleteCer = async (req, res) => {
  Certification.findOneAndRemove({ _id: req.params.id }).then((response) => {});
};

const editUserProfile = async (req, res) => {
  // console.log(req.params);
  console.log(req.body.certifications);
  const {
    newUserName,
    userJobTitle,
    aboutUser,
    userLocation,
    skills,
    educations,
    experiences,
    certifications,
  } = req.body;
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

  // Add skills
  User.updateOne({ _id: req.params.id }, { Skill_id: skills })
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => {
      // res.json(err);
    });
  // Add education
  educations?.map((education) => {
    if (education !== null) {
      if (education?._id !== "") {
        Education.updateOne(
          { _id: education?._id },
          {
            School: education?.school,
            Description: education?.description,
            Duration: education?.duration,
          }
        ).then((response) => {
          console.log(response);
        });
      } else {
        Education.create({
          School: education?.school,
          Description: education?.description,
          Duration: education?.duration,
          User_id: req.params?.id,
        })
          .then((response) => {
            User.updateOne(
              { _id: req.params.id },
              { $push: { Education_id: response?._id } }
            ).then((response) => {});
            // console.log(response);
          })
          .catch((err) => {
            // res.json(err);
          });
      }
    }
  });

  experiences?.map((experience) => {
    if (experience !== null) {
      try {
        if (experience?._id !== "") {
          Experience.updateOne(
            { _id: experience?._id },
            {
              Title: experience?.title,
              Company: experience?.company,
              Description: experience?.description,
              Duration: experience?.duration,
            }
          ).then((response) => {
            // console.log(response);
          });
        } else {
          Experience.create({
            Title: experience?.title,
            Company: experience?.company,
            Description: experience?.description,
            Duration: experience?.duration,
            User_id: req.params?.id,
          })
            .then((response) => {
              User.updateOne(
                { _id: req.params.id },
                { $push: { Experience_id: response?._id } }
              ).then((response) => {});
            })
            .catch((err) => {
              // res.json(err);
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  certifications?.map((certification) => {
    if (certification !== null) {
      console.log(certification?._id !== "");
      if (certification?._id !== "") {
        Certification.updateOne(
          { _id: certification?._id },
          {
            Name: certification?.name,
            Duration: certification?.duration,
            Description: certification?.description,
          }
        ).then((response) => {
          console.log(response);
        });
      } else {
        Certification.create({
          Name: certification?.name,
          Duration: certification?.duration,
          Description: certification?.description,
          User_id: req.params?.id,
        })
          .then((response) => {
            User.updateOne(
              { _id: req.params.id },
              { $push: { Certification_id: response?._id } }
            ).then((response) => {});
          })
          .catch((err) => {
            // res.json(err);
          });
      }
    }
  });
};

const getUserProfile = async (req, res) => {
  User.findOne({ _id: req.params.id })
    .select(
      "Name Picture Profile_bg Job_title About Location Experience_id Education_id Skill_id Certification_id"
    )
    .populate({
      path: "Experience_id Education_id Skill_id Certification_id",
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeProfile = async (req, res) => {
  try {
    // upload Image to cloudinary
    const data = await uploadToCloudinary(req.file.path, "profile-images");
    const user = await User.findById(req.params.id);
    if (user) {
      user.Picture = data.url;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const changeCover = async (req, res) => {
  try {
    // upload Image to cloudinary
    const data = await uploadToCloudinary(req.file.path, "cover-images");
    const user = await User.findById(req.params.id);
    if (user) {
      user.Profile_bg = data.url;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const follow = async (req, res) => {
  //   console.log(req.body);
  if (req.body.poster_id !== req.body.user_id) {
    try {
      const user = await User.findById({ _id: req.body.poster_id });
      const currentUser = await User.findById(req.body.user_id);
      if (!user.Follower.includes(req.body.user_id)) {
        await user.updateOne({ $push: { Follower: req.body.user_id } });
        await currentUser.updateOne({
          $push: { Following: req.body.poster_id },
        });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json("You can't follow yourself");
  }
};

const unfollow = async (req, res) => {
  //   console.log(req.body);
  if (req.body.poster_id !== req.body.user_id) {
    try {
      const user = await User.findById(req.body.poster_id);
      const currentUser = await User.findById(req.body.user_id);
      if (user.Follower.includes(req.body.user_id)) {
        await user.updateOne({ $pull: { Follower: req.body.user_id } });
        await currentUser.updateOne({
          $pull: { Following: req.body.poster_id },
        });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
};

const getNewNetwork = async (req, res) => {
  // console.log(req.params);
  if (req.params.id !== "undefind") {
    const userFollowing = await User.findOne({ _id: req.params.id }).select(
      "Following -_id"
    );
    const otherUsers = await User.find({ _id: { $ne: req.params.id } }).select(
      "_id Name Picture Job_title About"
    );
    // console.log(userFollowing.Following);
    // console.log(otherUsers);
    const unfollowedUser = otherUsers.filter((user) => {
      return !userFollowing.Following.includes(user._id);
    });
    // console.log(unfollowedUser);
    res.json(unfollowedUser);
  }
};

const getUsersFs = async (req, res) => {
  // console.log(req.params);
  User.findOne({ _id: req.params.userId })
    .select("Follower Following")
    .populate({ path: "Follower Following" })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const uploadResume = async (req, res) => {
  const path = req.file.path;
  const data = await uploadToCloudinaryFile(path, "user-resume");

  await JobPost.updateOne(
    { _id: req.params.jobid },
    {
      $push: {
        Applicants: {
          userid: new mongoose.Types.ObjectId(req.params?.userid),
          resume: data?.url,
          jobPubId: data?.public_id,
        },
      },
    }
  )
    .then((response) => {
      User.updateOne(
        { _id: req.params.userid },
        { $push: { Applied_Job_id: req.params.jobid } }
      )
        .then((response) => {
          res.json("Resume uploaded");
        })
        .catch((err) => {
          console.log(err);
          res.json("Error!");
        });
    })
    .catch((err) => {
      console.log(err);
      res.json("Error");
    });
};

module.exports = {
  signInGoogle,
  signUp,
  logIn,
  refresh,
  logOut,
  getUsers,
  getUserByEmail,
  editUserProfile,
  deleteExp,
  deleteEdu,
  deleteCer,
  getUserProfile,
  changeProfile,
  changeCover,
  follow,
  unfollow,
  getNewNetwork,
  getUsersFs,
  uploadResume,
};
