import React, { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const validUsername = "supplementaryAdminOnly";
  const validPassword = "supplementaryAdmin@524334";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username === validUsername && form.password === validPassword) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (authenticated) {
    return children; // Show protected content
  }

  // Show login form if not authenticated
  return (
    <div style={{ maxWidth: 350, margin: "100px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: 20 }}>Please login to continue</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: 5 }}>Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, fontSize: 14 }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 5 }}>Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, fontSize: 14 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 15, fontWeight: "bold" }}>{error}</div>}
        <button
          type="submit"
          style={{ width: "100%", padding: 10, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4, fontSize: 16, cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default ProtectedRoute;
