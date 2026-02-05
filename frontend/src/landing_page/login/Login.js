import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Attempting login to:", "http://localhost:8000/login");
      
      // Try with /login endpoint (from your authRoute.js)
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          email: formData.email,
          password: formData.password
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Login response data:", response.data);
      
      // Check different possible success responses
      if (response.data.status === true || response.data.success === true) {
        toast.success("Login successful! Redirecting to dashboard...");
        
        // Store token
        if (response.data.token) {
          setCookie('token', response.data.token, { 
            path: '/',
            maxAge: 3600 // 1 hour
          });
          localStorage.setItem('token', response.data.token);
        }
        
        // Store user data
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // REDIRECT TO DASHBOARD after 1.5 seconds
        setTimeout(() => {
          window.location.href = "http://localhost:3001"; // Go to dashboard
        }, 1500);
        
      } else {
        // Handle different error formats
        const errorMsg = response.data.message || 
                        response.data.error || 
                        "Login failed. Please check your credentials.";
        toast.error(errorMsg);
      }
      
    } catch (error) {
      console.error("Login error details:", error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        const errorMsg = errorData.message || 
                        errorData.error || 
                        `Login failed (Status: ${error.response.status})`;
        toast.error(errorMsg);
      } else if (error.request) {
        // Request made but no response
        console.error("No response received:", error.request);
        toast.error("Cannot connect to server. Please check if backend is running.");
      } else {
        // Other errors
        toast.error(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Test backend connection
  const testBackend = async () => {
    try {
      const response = await axios.get("http://localhost:8000/test");
      toast.info(`Backend is running: ${response.data.message}`);
      console.log("Backend test:", response.data);
    } catch (error) {
      toast.error("Backend is not reachable");
      console.error("Backend test failed:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="zerodha-logo">
          <img src="media/images/logo.svg" style={{ width: "50%" }} />
        </div>
        
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : "Sign In"}
          </button>
          

          <div className="form-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
        
        

      </div>
    </div>
  );
};

export default Login;