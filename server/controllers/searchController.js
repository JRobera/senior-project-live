const searchByCategory = (req, res) => {
  const { cate, query, u_id } = req.params;
  // console.log(req.params.u_id);
  if (cate === "Post" || cate === "ልጥፍ") {
    Post.find({
      Post_description: { $regex: "^[" + query + "]", $options: "i" },
    })
      .select("Post_description User_id")
      .populate({ path: "User_id", select: "Picture" })
      .then((response) => {
        // console.log(response);
        res.json(response);
      });
  } else if (cate === "Article" || cate === "ጽሑፍ") {
    Article.find({
      $or: [
        { Article_title: { $regex: "^[" + query + "]", $options: "i" } },
        { Article_content: { $regex: "^[" + query + "]", $options: "i" } },
      ],
    })
      .populate("User_id")
      .then((response) => {
        // console.log(response);
        res.json(response);
      });
  } else if (cate === "Jobseeker" || cate === "ሥራ ፈላጊ") {
    User.find(
      {
        $or: [
          { Name: { $regex: "^[" + query + "]", $options: "i" } },
          { Location: { $regex: "^[" + query + "]", $options: "i" } },
          // Skill_id: {},
        ],
        _id: { $ne: u_id },
        isEmployer: false,
      },
      { Name: 1, Picture: 1, Job_title: 1 }
    ).then((response) => {
      // console.log(u_id);
      res.json(response);
    });
  } else if (cate === "Employer" || cate === "አሠሪ") {
    User.find({
      $or: [
        { Name: { $regex: "^[" + query + "]", $options: "i" } },
        { Location: { $regex: "^[" + query + "]", $options: "i" } },
      ],
      _id: { $ne: u_id },
      isEmployer: true,
    }).then((response) => {
      // console.log(response);
      res.json(response);
    });
  } else if (cate === "Job Post" || cate === "የሥራ ልጥፍ") {
    JobPost.find({
      $or: [
        { Job_title: { $regex: "^[" + query + "]", $options: "i" } },
        { Company_name: { $regex: "^[" + query + "]", $options: "i" } },
        { Job_location: { $regex: "^[" + query + "]", $options: "i" } },
      ],
    })
      .populate({ path: "Company_id", select: "Picture" })
      .then((response) => {
        // console.log(response);
        res.json(response);
      });
  }
};

const foundPost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate("User_id")
    .then((response) => {
      // console.log(response);
      res.json(response);
    });
};

const foundArticle = (req, res) => {
  Article.findOne({ _id: req.params.id })
    .populate("User_id")
    .then((response) => {
      res.json(response);
    });
};

const foundUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("Experience_id Education_id Certification_id")
    .then((response) => {
      res.json(response);
    });
};

const foundEmployer = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate({ path: "Post_id Article_id" })
    .then((response) => {
      res.json(response);
    });
};

const foundJobPost = (req, res) => {
  JobPost.findOne({ _id: req.params.id })
    .populate({ path: "Company_id" })
    .then((response) => {
      res.json(response);
    });
};

module.exports = {
  searchByCategory,
  foundPost,
  foundArticle,
  foundUser,
  foundEmployer,
  foundJobPost,
};
