const mongoose = require("mongoose");
const {
  uploadToCloudinary,
  uploadToCloudinaryV,
  removeFromCloudinary,
} = require("../services/cloudinary");

const newTextPost = async (req, res) => {
  console.log(req.body);
  Post.create({
    Post_description: req.body.textPost,
    User_id: new mongoose.Types.ObjectId(req.params.id),
  })
    .then((response) => {
      User.updateOne(
        { _id: req.params.id },
        { $push: { Post_id: response._id } }
      )
        .then((response) => {
          res.json("Post created successfully");
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

const newPhotoPost = async (req, res) => {
  try {
    // console.log(req.file.path);
    // upload Image to cloudinary
    const data = await uploadToCloudinary(req.file.path, "post-images");
    // console.log(data, { depth: null });

    // TODO:
    // Create new post with image URL and public ID
    const post = new Post({
      postUrl: data.url,
      postId: data.public_id,
      postFormat: data.format,
      Post_description: req.body.postDescription,
      User_id: new mongoose.Types.ObjectId(req.params.id),
    });
    // save Image url and published to the database
    const savedImg = await Post.updateOne(
      { _id: post._id },
      {
        $set: {
          postUrl: data.url,
          postId: data.public_id,
          postFormat: data.format,
        },
      }
    );
    const updateuser = await User.updateOne(
      { _id: req.params.id },
      { $push: { Post_id: post._id } }
    );
    // TODO:
    // Save the new post to the database
    const savedPost = await post.save();
    // TODO:
    res.status(200).json("Post created successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

const newVideoPost = async (req, res) => {
  try {
    // upload Image to cloudinary
    const data = await uploadToCloudinaryV(req.file.path, "post-video");
    // TODO:
    // Create new post with image URL and public ID
    console.log(data);
    const post = new Post({
      postUrl: data.url,
      postId: data.public_id,
      postFormat: data.format,
      Post_description: req.body.postDescription,
      User_id: new mongoose.Types.ObjectId(req.params.id),
    });
    // save Image url and published to the database
    const savedImg = await Post.updateOne(
      { _id: post._id },
      {
        $set: {
          postUrl: data.url,
          postId: data.public_id,
          postFormat: data.format,
        },
      }
    );
    const updateuser = await User.updateOne(
      { _id: req.params.id },
      { $push: { Post_id: post._id } }
    );
    // TODO:
    // Save the new post to the database
    const savedPost = await post.save();
    // TODO:
    res.status(200).json("Post created successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPosts = (req, res) => {
  Post.find({})
    .populate({
      path: "User_id",
      select: "_id Name Picture Job_title Job_type Follower",
    })
    .sort({ $natural: -1 })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getUserPost = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("Name Job_title Picture Post_id")
    .populate({ path: "Post_id" })
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.json("No Post yet");
      }
    })
    .catch((err) => {
      res.json(err.data);
    });
};

const deleteUserpost = async (req, res) => {
  console.log(req.params);
  User.updateOne(
    { _id: req.params.userid },
    { $pull: { Post_id: req.params.postid } }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      res.json(err);
    });

  Post.findOneAndRemove({ _id: req.params.postid })
    .then((response) => {
      res.json("Post Deleted");
    })
    .catch((err) => {
      res.json(err);
    });
};

const editUserPost = async (req, res) => {
  Post.updateOne(
    { _id: req.body.postid },
    { Post_description: req.body.description }
  ).then((response) => {
    res.json("Post Updated successfully");
  });
};

const reportPost = async (req, res) => {
  const { postId, report } = req.body.report;

  Report.find({})
    .then((response) => {
      if (response.length !== 0) {
        response.some((element, i) => {
          if (element.postId == postId) {
            Report.updateOne(
              { _id: element._id },
              {
                $inc: { reportCount: 1 },
                $push: { report: { report: report } },
              }
            ).then((response) => {
              console.log(response);
            });
            return true;
          } else if (response.length - 1 === i) {
            Report.create({
              postId: new mongoose.Types.ObjectId(postId),
              reportCount: 1,
            }).then((response) => {
              response.report.push({ report: report });
              response.save();
            });
            return false;
          }
        });
      } else {
        Report.create({
          postId: new mongoose.Types.ObjectId(postId),
          reportPost: 1,
        }).then((response) => {
          response.report.push({ report: report });
          response.save();
        });
      }
      res.json("Reported");
    })
    .catch((error) => {
      res.json(error);
    });
  // res.json("Reported");
};

module.exports = {
  newTextPost,
  newPhotoPost,
  newVideoPost,
  getPosts,
  getUserPost,
  deleteUserpost,
  editUserPost,
  reportPost,
};
