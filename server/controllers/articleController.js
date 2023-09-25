const mongoose = require("mongoose");

const newArticle = (req, res) => {
  // console.log(req.body.id);
  Article.create({
    Article_title: req.body.articleTitle,
    Article_content: req.body.newArticle,
    User_id: new mongoose.Types.ObjectId(req.body.id),
  })
    .then((response) => {
      if (response) {
        // console.log(response._id);
        User.updateOne(
          { _id: req.body.id },
          { $push: { Article_id: response._id } }
        )
          .then((result) => {
            if (result) return res.json("Article created succesfully");
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const usersArticle = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("Article_id")
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.json("No Article yet");
      }
    })
    .catch((err) => {
      res.json(err.data);
    });
};

const latestArticle = (req, res) => {
  Article.find({})
    .limit(5)
    .sort({ date: 1 })
    .populate({ path: "User_id", select: "Name Picture" })
    .then((response) => {
      res.json(response);
    });
};

const deleteUserArticle = async (req, res) => {
  console.log(req.params);
  User.updateOne(
    { _id: req.params.userid },
    { $pull: { Article_id: req.params.id } }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      res.json(err);
    });

  Article.findOneAndRemove({ _id: req.params.id })
    .then((response) => {
      res.json("Article Deleted");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { newArticle, usersArticle, latestArticle, deleteUserArticle };
