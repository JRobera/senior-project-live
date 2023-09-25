const mongoose = require("mongoose");

const likePost = async (req, res) => {
  Post.findById({ _id: req.params.post_id })
    .select("Total_like -_id")
    .then((response) => {
      if (response?.Total_like.includes(req.params.user_id)) {
        Post.findByIdAndUpdate(
          { _id: req.params.post_id },
          { $pull: { Total_like: req.params.user_id } }
        )
          .then((response) => {
            res.json(false);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        Post.findByIdAndUpdate(
          { _id: req.params.post_id },
          { $push: { Total_like: req.params.user_id } }
        )
          .then((response) => {
            // console.log("pus " + response.Total_like);
            res.json(true);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
};

const addComment = (req, res) => {
  Comment.create({
    Text: req.body.comment,
    User_id: new mongoose.Types.ObjectId(req.body.userId),
  })
    .then(async (response) => {
      await Post.updateOne(
        { _id: req.body.postId },
        { $push: { Comment: response._id } }
      ).then((response) => {
        res.json(response);
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

const addCommentReply = (req, res) => {
  Comment.create({
    Text: req.body.reply,
    User_id: new mongoose.Types.ObjectId(req.body.userId),
  })
    .then(async (response) => {
      await Comment.updateOne(
        { _id: req.body.commentId },
        { $push: { Comment_reply: response._id } }
      ).then((response) => {
        res.json(response);
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

const getComments = (req, res) => {
  Post.findOne({ _id: req.params.post_id })
    .select("Comment -_id")
    .populate({
      path: "Comment",
      populate: {
        path: "User_id",
        select: "Name Company_name Picture Job_title Job_type",
      },
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getCommentReply = (req, res) => {
  Comment.findOne({ _id: req.params.comment_id })
    .select("Comment_reply")
    .populate({
      path: "Comment_reply",
      populate: {
        path: "User_id",
        select: "Name Company_name Picture Job_title Job_type",
      },
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

const sharePost = async (req, res) => {
  let postIdList = [];
  User.findOne({ _id: req.params.user_id }).then((response) => {
    postIdList = response.Post_id;
    // console.log(postIdList.includes(req.params.id));
    if (!postIdList.includes(req.params.id)) {
      User.findByIdAndUpdate(
        { _id: req.params.user_id },
        { $push: { Post_id: req.params.id } }
      ).then((response) => {
        res.json("Post shared");
      });
    } else {
      res.json("Post already shared");
    }
  });
};

module.exports = {
  likePost,
  addComment,
  addCommentReply,
  getComments,
  getCommentReply,
  sharePost,
};
