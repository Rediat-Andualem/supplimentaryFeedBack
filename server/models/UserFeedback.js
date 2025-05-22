module.exports = (sequelize, DataTypes) => {
  const UserFeedback = sequelize.define(
    "UserFeedback",
    {
      UserFeedbackId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      courseSelected: {
        type: DataTypes.ENUM(
          "PowerBI",
          "SharePoint",
          "SoftwareTesting",
          "MuleSoft",
          "Database Management",
          "AWS"
        ),
        allowNull: false,
      },
      Phase: {
        type: DataTypes.ENUM("PHASE-1", "PHASE-2", "PHASE-3", "PHASE-4"),
        allowNull: false,
      },
      FeedBackOn: {
        type: DataTypes.ENUM(
          "courseDelivery",
          "timeManagement",
          "instructorRelated",
          "groupSession",
          "liveSession",
          "courseContent",
          "technical",
          "other"
        ),
        allowNull: false,
      },
      ImprovementLabel: {
        type: DataTypes.ENUM("High", "Moderate", "Low"),
        allowNull: false,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return UserFeedback;
};
