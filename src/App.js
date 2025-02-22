import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/AddProduct";
import ForgotPassword from "./components/ForgotPassword"; // ✅ Import Forgot Password Component
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS
import VerifyOtp from './components/verifyOTP'
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarProvider } from "notistack";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <SnackbarProvider maxSnack={3}>

    <AuthProvider> {/* Wrap Everything Inside AuthProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Added Route */}
          <Route path="/verify-otp" element={<VerifyOtp />} />  {/* ✅ Added Route */}

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </SnackbarProvider>

  );
}

export default App;
