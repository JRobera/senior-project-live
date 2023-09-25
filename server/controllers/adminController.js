const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const newAdmin = async (req, res) => {
  const { Name, Password } = req.body.newAdmin;
  Admin.findOne({ Name: Name }).then((response) => {
    if (!response) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          throw err;
        }
        bcrypt.hash(Password, salt, function (err, hash) {
          if (err) {
            throw err;
          } else {
            Admin.create({
              Name: Name,
              Password: hash,
            });
            res.json("Account created");
          }
        });
      });
    } else {
      res.json("Account existes");
    }
  });
};

const adminLogin = async (req, res) => {
  const { Name, Password } = req.body.admin;
  Admin.findOne({ Name: Name }).then((response) => {
    if (response) {
      bcrypt.compare(Password, response.Password, (err, result) => {
        if (result) {
          const admin = {
            _id: response._id,
            Name: response.Name,
          };
          const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
          });

          const refreshToken = jwt.sign(
            admin,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          Admin.updateOne(
            { Name: response.Name },
            { refreshToken: refreshToken }
          ).then((response) => {
            //
          });

          res.cookie("ajwt", refreshToken, {
            withCredentials: true,
            secure: true,
            sameSite: "none",
            httpOnly: true,
          });

          res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
          res.json("Incorrect Password");
        }
      });
    } else {
      res.json("User dose not existe");
    }
  });
};

const adminrefresh = async (req, res) => {
  const refreshToken = req.cookies.ajwt;

  // if (!refreshToken) return res.status(401).json("You are not authenticated");
  Admin.findOne({ refreshToken: refreshToken }).then((response) => {
    if (response) {
      const admin = {
        _id: response._id,
        Name: response.Name,
      };
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);
          const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
          });
          // user && console.log(accessToken);
          res.json({ accessToken: accessToken });
        }
      );
    }
    // console.log("THE cookie " + req.cookies.ajwt);
  });
};

const adminLogOut = (req, res) => {
  res.clearCookie("ajwt", { httpOnly: true, path: "/" });
  res.status(200).json("Admin Logged out");
};

const deleteAdmin = async (req, res) => {
  console.log(req.body);
  Admin.findOneAndRemove({ Name: req.body.adminName }).then((response) => {
    if (response) {
      res.json("Account Deleted");
    } else {
      res.json("Account not found");
    }
  });
};

const deleteUser = async (req, res) => {
  User.findOneAndRemove({ _id: req.params.id }).then((response) => {
    res.json("User Account Deleted!");
  });
  // Post.find
};

const blockUser = async (req, res) => {
  User.updateOne({ _id: req.params.id }, { isActive: false }).then(
    (response) => {
      res.json("User Blocked!");
    }
  );
};

const unBlockUser = async (req, res) => {
  User.updateOne({ _id: req.params.id }, { isActive: true }).then(
    (response) => {
      res.json("User Unblocked!");
    }
  );
};

const adminGetUsers = (req, res) => {
  User.find({}).then((response) => {
    res.json(response);
  });
};

const getReports = async (req, res) => {
  Report.find({})
    .populate({ path: "postId" })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteReportedPost = async (req, res) => {
  Report.findOneAndRemove({ _id: req.params.reportId }).then((response) => {
    console.log(response);
  });
  Post.findOneAndRemove({ _id: req.params.id }).then((response) => {
    res.json("Post Deleted");
  });
};

module.exports = {
  newAdmin,
  adminLogin,
  adminrefresh,
  adminLogOut,
  deleteAdmin,
  deleteUser,
  blockUser,
  unBlockUser,
  adminGetUsers,
  getReports,
  deleteReportedPost,
};
