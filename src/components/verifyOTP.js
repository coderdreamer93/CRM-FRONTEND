import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // ✅ Get email from state

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", { email, otp, newPassword });
      toast.success("Password reset successfully");
      navigate("/login"); // ✅ Redirect to login after reset
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Verify OTP</h2>
        <input type="text" placeholder="Enter OTP" className="form-control my-2"
          onChange={(e) => setOtp(e.target.value)} required />
        <input type="password" placeholder="New Password" className="form-control my-2"
          onChange={(e) => setNewPassword(e.target.value)} required />
        <button className="btn btn-success w-100" onClick={resetPassword}>Reset Password</button>
      </div>
    </div>
  );
};

export default VerifyOtp;
