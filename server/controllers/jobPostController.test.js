const mongoose = require("mongoose");

const { newJobPost } = require("./jobPostController");

describe("newJobPost", () => {
  it("should create a new job post", async () => {
    const req = {
      params: {
        id: "123",
      },
      body: {
        Job_title: "Test Job",
        Job_description: "This is a test job",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await newJobPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        Job_title: "Test Job",
        Job_description: "This is a test job",
        Company_id: new mongoose.Types.ObjectId("646ddd68c9674933912e0c5d"),
      })
    );
  });
});
