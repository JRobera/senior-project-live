const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Picture: {
    type: String,
    default:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAdwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwECB//EADsQAAEDAgQDAgsGBwEAAAAAAAEAAgMEEQUSITEiQVFhcQYTFCMygZGhsdHhFUJScvDxNDVTVGJzkjP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cUREBERARF5cdUHqKNJiFHEbPqYwemZcvteg/uG+woJyKPFW0s2kdRG49A5d7oPUREBERAREQEREBeFCVmcaxY1DnU9O60I0c4ff+iCbiGOxwkx0oEjxpmPoj5qiqayoqjeeVzh+HYexcEQEREBSqXEKqlI8VKcv4HahRUQanDsahqiI5R4qU7AnQ9xVqsCr7BMWJc2lqnXvpG8/AoNAiIgIiICIvDsgpvCKuMMQponWfILuIOzfqs2u9dUGqq5ZidHO4e7kuCAiKRQUj6yoEbTZu7nW2CDixj5HZY2uc7oBddzh9YBfyaW35VpqenipowyFgaPee9dUGMc1zSQ5paRuCF4tbWUkVWzLK0X5PA1Cy1TA+mmdFJu3n1HVBzREQazA63yulyyOvLHo7t6FWSx+CVHk+IR68EnA717e+y2AQEREBRsSkMVBUPG4YbKSoONfyuo/KPiEGPREQFf+D0YbSySc3Pt6gB8yqBXvg7MDFLAd2uzju/QQW6IiAqPwjjAfBINyC0+r9yrxUPhDMHTxQg+gCT3n9vegqUREAEtIcNwbreRuzxtd+IArBLc0f8ACQX/AKbfgg7IiICj18XjqKeMbuYQO9SEQYAaheqVidN5LXSxAWbfM3uKioC6U88lPM2WI2c33rm0Fzg1oJJ0AHNXFHgpcA+rcW/4N39ZQWFHiVPUtAziOTm1xt7Oql3AFyRbqq6fBaWQebzRHsNwfao/2BfepFv9f1QSq7FoKdpbE5ssvIA6DvKzsj3SSOfIcznG5K0MWC0kbCHh0hI9Iutb2KDW4NJEC+mJkYN2/eHzQVSIiD1jDI9rBu4gD1reMAawNGwFllMApvH4g15HDDxHv5LWICIiAiIgq8doTV0/jIxeWPUDqOYWVW+VXPhETq9lUywbe747aE8ig4YRh4poxLKPPOH/ACOisURAREQEREFPjWHhzXVMDeIayAcx1VI1pe4NaCSdABzWz30te/JRsOwmKlnfMeIk+bB+4Pmg7YTReRUoYf8A0dxPPb0U1EQEREBERAREQfDow7sK5ujcOV13RBF2RSrLyw6BBGAvsvtsZO+i7og+WsDV9IiAiIgIiICIiAi8OypZJMcZUSSRwQvivlaw2Fxd3EOLe2Ua+/CFpd5unfcutmYLD0rbP7v1e3R8uOte4shp3i+VoIDQdTr6Vxfh68zbkgukVPBJjIZO6WCNznFhiAtpoM4tm7yNdeZC8ilx0zedgpWxB7QRY3Lb8VuLkPb05ILm68uFXV3l5cwU5fqyQEx5A0O0yE5tezS/PsUKQY20u8S6R9i9oMois7hFnaEc7kN031IQX1wlwqE/b1szbZrHgdkLb5eu5AO21+eUL7pm44+pjNQY4oQ9uYcJzNtr7x2au6N1C8RBsiAiIg//2Q==",
  },
  Profile_bg: {
    type: String,
    default:
      "https://res.cloudinary.com/do9somcfd/image/upload/v1684594888/cover-images/Profbg_ol05r0.png",
  },
  Location: { type: String, default: "--" },
  Job_title: { type: String, default: "--" },
  Job_type: { type: String, default: "--" },
  About: { type: String, default: "--" },
  Post_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  Article_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "articles" }],
  My_Job_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobposts" }],
  Applied_Job_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobposts" }],
  Experience_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "experiences" }],
  Education_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "educations" }],
  Skill_id: [{ type: String, required: true }],
  Certification_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "certifications" },
  ],
  Following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  Follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  isActive: { type: Boolean, default: true },
  isEmployer: { type: Boolean },
  refreshToken: { type: String },
});

module.exports = User = mongoose.model("users", UserSchema);
