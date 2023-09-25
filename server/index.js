require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");

const jobSeekerRoute = require("./routes/jobSeekerRoute.js");
const postRoute = require("./routes/postRoute.js");
const articleRoute = require("./routes/articleRoute.js");
const searchRoute = require("./routes/searchRoute.js");
const reactionRoute = require("./routes/reactionRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const jobPostRoute = require("./routes/jobPostRoute.js");

const employerRoute = require("./routes/employerRoute.js");
const userRoute = require("./routes/userRoute.js");
const adminRoute = require("./routes/adminRoute.js");

app.use(cookieParser());
app.use(
  cors({
    origin: ["https://habesha-net.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://habesha-net.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Con " + socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(data);
    // console.log(`User with id: ${socket.id} joind room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.in(data.room).emit("receive_message", data);
    // console.log(`${JSON.stringify(data)}`);
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected ", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(`Error connecting to DB ${err}`);
  });

const Employer = require("./models/employerModel");
const JobSeeker = require("./models/jobseekerModel");
const User = require("./models/userModel.js");

const Message = require("./models/messageModel");
const Article = require("./models/articleModel");
const Post = require("./models/postModel");
const Comment = require("./models/commentModel");

const Education = require("./models/educationModel.js");
const Experience = require("./models/experienceModel.js");
const Skill = require("./models/skillModel.js");
const Certification = require("./models/certificationModel.js");
const JobPost = require("./models/jobPostModel.js");
const Report = require("./models/reportModel.js");
const Admin = require("./models/admin.js");

// Varify users access token

// // Sign up user

app.use("/", jobSeekerRoute);
app.use("/", articleRoute);
app.use("/", postRoute);
app.use("/", searchRoute);
app.use("/", reactionRoute);
app.use("/", chatRoute);

app.use("/", employerRoute);
app.use("/", jobPostRoute);
app.use("/", userRoute);
app.use("/", adminRoute);

// // chat

// // Search api

// // Add new Photo Post to DB

// // Reactions

// // Add new article to DB

// // follow unfollow

server.listen(process.env.PORT || 3005, () => {
  console.log("Server Started on port 3005");
});
