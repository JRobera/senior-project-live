const myChats = (req, res) => {
  let chats = [];
  User.findOne({ _id: req.params.user_id })
    .select("Following Follower")
    .populate({ path: "Following Follower", select: "Name Email Picture" })
    .then((response) => {
      chats = response.Following.concat(response.Follower).reduce(
        (acc, cur) => {
          const found = acc.find((obj) => obj._id.equals(cur._id));
          if (!found) {
            acc.push(cur);
          }
          return acc;
        },
        []
      );

      // chats = [...chats, ...response.Following];
      // chats = [...chats, ...response.Follower];
      // console.log("my Chats " + chats);
      // console.log(response);
      res.json(chats);
    });
};

const getMessage = async (req, res) => {
  console.log("THE REQ: " + req.params.id);

  await Message.findOne({ Message_id: req.params.id }).then((response) => {
    res.json(response);
  });
};

const getAllMessage = (req, res) => {
  // console.log("THE REQ: " + req.params.id);

  Message.find({}, { Message_id: 1, _id: 0 }).then((response) => {
    // console.log(response);
    res.json(response);
    // console.log(response);
  });
};

const getChat = async (req, res) => {
  console.log("Room id: " + req.params.room);
  // "64184cfef38c1fb9cd78938d--6416c5147915e46006372078"
  await Message.findOne({
    Message_id: req.params.room,
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
};

const createRoom = async (req, res) => {
  // console.log("create " + req.params.room);
  await Message.create({
    Message_id: req.params.room,
  });
};

const updateChat = async (req, res) => {
  await Message.updateOne(
    { Message_id: req.params.room },
    { Message_content: req.body }
  )
    .then((response) => {
      console.log("update " + req.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  myChats,
  getMessage,
  getAllMessage,
  getChat,
  createRoom,
  updateChat,
};
