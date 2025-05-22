const { User } = require("../models");

const userFeedback = async (req, res) => {
  const { courseSelected, Phase, FeedBackOn, ImprovementLabel, comments } =
    req.body;

  try {
    res
      .status(201)
      .json({ courseSelected, Phase, FeedBackOn, ImprovementLabel, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

module.exports = {
  userFeedback,
};
