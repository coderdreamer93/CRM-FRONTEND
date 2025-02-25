import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
import { Spinner } from "react-bootstrap"; // ✅ Bootstrap Spinner for Loader
import { toast, ToastContainer } from "react-toastify";
import { useSnackbar } from "notistack"; // ✅ Import Snackbar

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ Loading state added
  const { enqueueSnackbar } = useSnackbar(); // ✅ Snackbar Hook

  if (!authContext) {
    return <p className="text-danger text-center">AuthContext is not available. Check App.js</p>;
  }

  const { login } = authContext;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start Loader
    try {
      const res = await axios.post("https://node-js-boiler-plate.vercel.app/api/auth/login", formData);
      login(res.data.token, res.data.user);
      enqueueSnackbar(res.data.message, { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } });

      // toast.success(res.data.message); // ✅ Backend ka message show hoga
      // toast.success("Login Successful");
      console.log("Login Message", res.data?.message)
      navigate("/dashboard");
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      // enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      enqueueSnackbar(error.response?.data?.message || "Something went wrong", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" } // ✅ Show on Top-Right
      });
    }
    finally {
      setLoading(false); // ✅ Loader stop
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "400px" }}>
          <h2 className="text-center text-primary mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-end mb-3">
              <span
                className="text-primary fw-bold cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"} {/* ✅ Loader inside button */}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-3">
            <span className="text-muted">OR</span>
          </div>

          {/* Register Link */}
          <p className="text-center">
            Don't have an account?{" "}
            <span
              className="text-primary fw-bold cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
