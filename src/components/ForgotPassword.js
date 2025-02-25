import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // ✅ Step 1: Send OTP
    const sendOtp = async () => {
        try {
            const res = await axios.post("https://node-js-boiler-plate.vercel.app/api/auth/forgot-password", { email });
            enqueueSnackbar(res.data.message, { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } });
            setStep(2);
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Failed to send OTP", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
        }
    };

    // ✅ Step 2: Verify OTP
    const verifyOtp = async () => {
        try {
            const res = await axios.post("https://node-js-boiler-plate.vercel.app/api/auth/verify-otp", { email, otp });
            enqueueSnackbar(res.data.message, { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } });
            setStep(3);
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Invalid OTP", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
        }
    };

    // ✅ Step 3: Reset Password
    const resetPassword = async () => {
        try {
            const res = await axios.post("https://node-js-boiler-plate.vercel.app/api/auth/reset-password", { email, otp, newPassword });
            enqueueSnackbar(res.data.message, { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } });
            navigate("/login"); // ✅ Redirect to login page
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Failed to reset password", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "400px" }}>
                <h2 className="text-center text-primary mb-4">
                    {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
                </h2>

                {step === 1 && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-100" onClick={sendOtp}>Send OTP</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-success w-100" onClick={verifyOtp}>Verify OTP</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-100" onClick={resetPassword}>Reset Your Password</button>
                    </>
                )}

                {/* Back to Login Link */}
                <p className="text-center mt-3">
                    <span
                        className="text-primary fw-bold cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
