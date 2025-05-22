const { UserFeedback } = require("../models");

// 1. Submit Feedback
const { Op } = require("sequelize");

const submitFeedback = async (req, res) => {
  const { courseSelected, Phase, FeedBackOn, ImprovementLabel, comments } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Count submissions in last 30 days from same IP
    const feedbackCount = await UserFeedback.count({
      where: {
        ip,
        createdAt: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
    });

    if (feedbackCount >= 35) {
      return res.status(429).json({
        message: "You have reached the monthly feedback submission limit (35).",
      });
    }

    const feedback = await UserFeedback.create({
      courseSelected,
      Phase,
      FeedBackOn,
      ImprovementLabel,
      comments,
      ip,
    });

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ message: "Server error while submitting feedback" });
  }
};


// 2. Get Feedback with Filtering
const getFilteredFeedback = async (req, res) => {
  const { courseSelected, Phase } = req.query;

  try {
    const whereClause = {};
    if (courseSelected) whereClause.courseSelected = courseSelected;
    if (Phase) whereClause.Phase = Phase;

    const feedbacks = await UserFeedback.findAll({ where: whereClause });
    res.status(200).json({ feedbacks });
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ message: "Server error while fetching feedback" });
  }
};

// 3. Delete Feedback
const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const deleted = await UserFeedback.destroy({
      where: { UserFeedbackId: feedbackId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ message: "Server error while deleting feedback" });
  }
};

module.exports = {
  submitFeedback,
  getFilteredFeedback,
  deleteFeedback,
};
