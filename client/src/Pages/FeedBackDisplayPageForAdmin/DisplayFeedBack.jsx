import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { axiosInstance } from "../../utility/axiosInstance";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiSmileySadThin } from "react-icons/pi";

const FeedbackFilterPage = () => {
  const [filters, setFilters] = useState({
    courseSelected: "",
    Phase: "",
    FeedBackOn: "",
    ImprovementLabel: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // States for delete confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axiosInstance.post(
        "feedback/getFeedback",
        filters
      );
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      toast.error("Failed to fetch feedbacks");
      console.error(error);
    }
  };

  // Open confirmation modal on delete button click
  const confirmDelete = (id) => {
    setSelectedDeleteId(id);
    setShowConfirm(true);
  };

  // Delete feedback after confirmation
  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      await axiosInstance.delete(`/feedback/deleteFeedback/${selectedDeleteId}`);
      toast.success("Comment deleted successfully");
      setFeedbacks(feedbacks.filter((fb) => fb.UserFeedbackId !== selectedDeleteId));
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    } finally {
      setShowConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Filter Feedbacks</h4>

      <div className="row mb-3">
        <div className="col-md-3">
          <label>Course</label>
          <select
            className="form-select"
            name="courseSelected"
            value={filters.courseSelected}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Course
            </option>
            <option value="PowerBI">PowerBI</option>
            <option value="SharePoint">SharePoint</option>
            <option value="SoftwareTesting">SoftwareTesting</option>
            <option value="MuleSoft">MuleSoft</option>
            <option value="Database Management">Database Management</option>
            <option value="AWS">AWS</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Phase</label>
          <select
            className="form-select"
            name="Phase"
            value={filters.Phase}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Phase
            </option>
            <option value="PHASE-1">PHASE-1</option>
            <option value="PHASE-2">PHASE-2</option>
            <option value="PHASE-3">PHASE-3</option>
            <option value="PHASE-4">PHASE-4</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Feedback On</label>
          <select
            className="form-select"
            name="FeedBackOn"
            value={filters.FeedBackOn}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Feedback On
            </option>
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

        <div className="col-md-3">
          <label>Improvement Label</label>
          <select
            className="form-select"
            name="ImprovementLabel"
            value={filters.ImprovementLabel}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Improvement Level
            </option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="mb-3 text-end">
        <Button onClick={fetchFeedbacks}>Search Feedback</Button>
      </div>

      {feedbacks.length === 0 ? (
        <>
          <hr />
          <h4>
            No Feedback to show <PiSmileySadThin />{" "}
          </h4>
        </>
      ) : (
<Paper sx={{ width: "100%" }}>
 <DataGrid
  rows={feedbacks.map((item) => ({
    id: item.UserFeedbackId,
    comments: item.comments,
  }))}
  columns={[
    {
      field: "comments",
      headerName: "Feedback Comments",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "1.5",
            fontSize: "14px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => confirmDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ]}
  getRowHeight={(params) => {
    const text = params.model.comments || '';
    const averageCharsPerLine = 100;
    const lineHeight = 22; // px
    const baseHeight = 40; // minimum height
    const lines = Math.ceil(text.length / averageCharsPerLine);
    return baseHeight + lines * lineHeight;
  }}
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={[10, 20, 50]}
  sx={{ border: 1 }}
/>
</Paper>


      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default FeedbackFilterPage;
