import { useState } from "react";
import "./FormComponent.css";
import { axiosInstance } from "../../utility/axiosInstance";
import { VscFeedback } from "react-icons/vsc";
function FormComponent() {
  const [feedbackData, setFeedbackData] = useState({
    courseSelected: "",
    Phase: "",
    FeedBackOn: "",
    ImprovementLabel: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFeedbackChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await axiosInstance.post("/users/feedbacks", feedbackData);
      setSuccess("Feedback submitted successfully!");
      setFeedbackData({
        courseSelected: "",
        Phase: "",
        FeedBackOn: "",
        ImprovementLabel: "",
        comments: "",
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSignUp">
      <form onSubmit={handleSubmitFeedback}>
        <h4>Submit Your Feedback</h4>

        <div className="form-input">
          <select
            name="courseSelected"
            value={feedbackData.courseSelected}
            onChange={handleFeedbackChange}
            required
          >
            <option value="">Select Course</option>
            <option value="PowerBI">PowerBI</option>
            <option value="SharePoint">SharePoint</option>
            <option value="SoftwareTesting">Software Testing</option>
            <option value="MuleSoft">MuleSoft</option>
            <option value="Database Management">Database Management</option>
            <option value="AWS">AWS</option>
          </select>
        </div>

        <div className="form-input">
          <select
            name="Phase"
            value={feedbackData.Phase}
            onChange={handleFeedbackChange}
            required
          >
            <option value="">Select Phase</option>
            <option value="PHASE-1">PHASE-1</option>
            <option value="PHASE-2">PHASE-2</option>
            <option value="PHASE-3">PHASE-3</option>
            <option value="PHASE-4">PHASE-4</option>
          </select>
        </div>

        <div className="form-input">
          <select
            name="FeedBackOn"
            value={feedbackData.FeedBackOn}
            onChange={handleFeedbackChange}
            required
          >
            <option value="">Feedback On</option>
            <option value="courseDelivery">Course Delivery</option>
            <option value="timeManagement">Time Management</option>
            <option value="instructorRelated">Instructor Related</option>
            <option value="groupSession">Group Session</option>
            <option value="liveSession">Live Session</option>
            <option value="courseContent">Course Content</option>
            <option value="technical">Technical</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-input">
          <select
            name="ImprovementLabel"
            value={feedbackData.ImprovementLabel}
            onChange={handleFeedbackChange}
            required
          >
            <option value="">Improvement Level</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-input">
       <input
                  name="comments" 
                  className="forInputFeedback"
                   placeholder="Any additional comments"
                    value={feedbackData.comments}
                      onChange={handleFeedbackChange}
                    required
                  />

        </div>

        <div className="btn-login">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : `Submit Feedback ${<VscFeedback />}`}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default FormComponent;
