import { useState } from "react";
import "./FormComponent.css";
import { axiosInstance } from "../../utility/axiosInstance";
import { VscFeedback } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function FormComponent() {
  const [feedbackData, setFeedbackData] = useState({
    courseSelected: "",
    Phase: "",
    FeedBackOn: "",
    ImprovementLabel: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // modal control

  const handleFeedbackChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  const confirmSubmission = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleSubmitFeedback = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      await axiosInstance.post("/feedback/submitFeedbacks", feedbackData);
      toast.success("Feedback submitted successfully!");
      setFeedbackData({
        courseSelected: "",
        Phase: "",
        FeedBackOn: "",
        ImprovementLabel: "",
        comments: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  const cancelSubmission = () => setShowConfirm(false);

  return (
    <div className="loginSignUp">
      <form onSubmit={confirmSubmission}>
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
            <option value="PHASE-1">Phase 1</option>
            <option value="PHASE-2">Phase 2</option>
            <option value="PHASE-3">Phase 3</option>
            <option value="PHASE-4">Phase 4</option>
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
          <textarea
            name="comments"
            className="forInputFeedback"
            placeholder="Any additional comments (700 characters max)"
            value={feedbackData.comments}
            onChange={handleFeedbackChange}
            rows={8}
            maxLength={700}
            required
          />
        </div>

        <div className="btn-login">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"} <VscFeedback />
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="text-underline">Confirm Your Submission</h3>
            <p><strong>Note:</strong> These are your feedback main points. Make sure you selected the right course and phase.</p>
            <ul className="modal-summary">
              <li><FaCheckCircle /> Course Selected: {feedbackData.courseSelected}</li>
              <li><FaCheckCircle /> Phase: {feedbackData.Phase}</li>
            </ul>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleSubmitFeedback}>Confirm & Submit</button>
              <button className="cancel-btn" onClick={cancelSubmission}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default FormComponent;
