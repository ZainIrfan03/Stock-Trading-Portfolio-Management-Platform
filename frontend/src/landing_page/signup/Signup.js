import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [setCookie] = useCookies(['token']);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    
    try {
      // Make API call to backend
      const response = await axios.post(
        "http://localhost:8000/signup",
        {
          username: formData.name,
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );
      
      console.log("Signup response:", response.data);
      
      if (response.data.status) {
        // Success - store token and redirect
        toast.success("Account created successfully!");
        
        // Store token in cookies
        if (response.data.token) {
          setCookie('token', response.data.token, { path: '/' });
        }
        
        // Store user data in localStorage
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // Redirect to DASHBOARD
        setTimeout(() => {
          window.location.href = "http://localhost:3001";
        }, 1500);
        
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      
      // Show error message from backend if available
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="zerodha-logo">
          <img src="media/images/logo.svg" style={{ width: "50%" }} />
        </div>
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <input type="checkbox" required /> I agree to the <a href="/terms"style={{textDecoration:"none"}}>Terms of Service</a> and <a href="/privacy" style={{textDecoration:"none"}} >Privacy Policy</a>.
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          
          <div className="form-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signup;