 // frontend/src/landing_page/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('holdings');
  const [userData, setUserData] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }
    
    if (user) {
      setUserData(JSON.parse(user));
    }
    
    // Fetch dashboard data
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch holdings data
      const holdingsRes = await fetch('http://localhost:8000/allHoldings');
      const holdingsData = await holdingsRes.json();
      setHoldings(holdingsData);
      
      // Fetch positions data
      const positionsRes = await fetch('http://localhost:8000/allPositions');
      const positionsData = await positionsRes.json();
      setPositions(positionsData);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Calculate portfolio summary
  const calculateSummary = () => {
    let totalValue = 0;
    let totalInvestment = 0;
    let todaysPNL = 0;
    
    holdings.forEach(item => {
      const currentValue = item.qty * item.price;
      const investment = item.qty * item.avg;
      totalValue += currentValue;
      totalInvestment += investment;
    });
    
    return {
      totalValue: totalValue.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }),
      totalInvestment: totalInvestment.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }),
      todaysPNL: todaysPNL.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }),
      overallReturn: totalInvestment > 0 
        ? (((totalValue - totalInvestment) / totalInvestment) * 100).toFixed(2)
        : '0.00'
    };
  };

  const summary = calculateSummary();

  const renderContent = () => {
    switch(activeTab) {
      case 'holdings':
        return (
          <div className="table-container">
            <h3>Your Holdings</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Avg. Price</th>
                  <th>Current Price</th>
                  <th>Current Value</th>
                  <th>P&L (%)</th>
                  <th>Day P&L (%)</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, index) => {
                  const currentValue = holding.qty * holding.price;
                  const investment = holding.qty * holding.avg;
                  const pnlPercent = ((currentValue - investment) / investment * 100).toFixed(2);
                  
                  return (
                    <tr key={index}>
                      <td className="stock-name">
                        <strong>{holding.name}</strong>
                      </td>
                      <td>{holding.qty}</td>
                      <td>₹{holding.avg?.toFixed(2) || '0.00'}</td>
                      <td>₹{holding.price?.toFixed(2) || '0.00'}</td>
                      <td>₹{currentValue.toFixed(2)}</td>
                      <td className={pnlPercent >= 0 ? 'profit' : 'loss'}>
                        {pnlPercent}%
                      </td>
                      <td className={holding.day?.includes('-') ? 'loss' : 'profit'}>
                        {holding.day || '0.00%'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        
      case 'positions':
        return (
          <div className="table-container">
            <h3>Current Positions</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Avg. Price</th>
                  <th>Current Price</th>
                  <th>P&L (%)</th>
                  <th>Day P&L (%)</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, index) => (
                  <tr key={index}>
                    <td>{position.product}</td>
                    <td className="stock-name">
                      <strong>{position.name}</strong>
                    </td>
                    <td>{position.qty}</td>
                    <td>₹{position.avg?.toFixed(2) || '0.00'}</td>
                    <td>₹{position.price?.toFixed(2) || '0.00'}</td>
                    <td className={position.net?.includes('-') ? 'loss' : 'profit'}>
                      {position.net || '0.00%'}
                    </td>
                    <td className={position.day?.includes('-') ? 'loss' : 'profit'}>
                      {position.day || '0.00%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      default:
        return (
          <div className="welcome-message">
            <h2>Welcome to Zero0ha Dashboard</h2>
            <p>Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">📈</span>
            <span className="logo-text">ZERO0HA</span>
          </div>
        </div>
        
        <div className="user-info">
          <div className="avatar">
            {userData?.name?.[0] || userData?.username?.[0] || 'U'}
          </div>
          <div className="user-details">
            <h4>{userData?.name || userData?.username || 'User'}</h4>
            <p>{userData?.email || 'user@example.com'}</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'holdings' ? 'active' : ''}`}
            onClick={() => setActiveTab('holdings')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Holdings</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'positions' ? 'active' : ''}`}
            onClick={() => setActiveTab('positions')}
          >
            <span className="nav-icon">📈</span>
            <span className="nav-label">Positions</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-label">Orders</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-label">Watchlist</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Search stocks..." />
            <button className="search-btn">🔍</button>
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">
              <span className="icon">🔔</span>
              <span className="badge">3</span>
            </button>
            <button className="icon-btn">
              <span className="icon">⚙️</span>
            </button>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1>Welcome back{userData?.name ? `, ${userData.name}` : ''}! 👋</h1>
            <p>Here's your portfolio overview</p>
          </div>
          
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Portfolio Value</h3>
              <p className="stat-value">{summary.totalValue}</p>
              <p className="stat-change">
                <span className={summary.overallReturn >= 0 ? 'positive' : 'negative'}>
                  {summary.overallReturn >= 0 ? '↗' : '↘'} {summary.overallReturn}%
                </span> overall
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Investment</h3>
              <p className="stat-value">{summary.totalInvestment}</p>
              <p className="stat-change">Total invested amount</p>
            </div>
            <div className="stat-card">
              <h3>Today's P&L</h3>
              <p className="stat-value">{summary.todaysPNL}</p>
              <p className="stat-change positive">+0.00% today</p>
            </div>
            <div className="stat-card">
              <h3>Available Funds</h3>
              <p className="stat-value">₹25,000</p>
              <p className="stat-change">Add funds</p>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="main-content-area">
            {renderContent()}
          </div>
          
          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn">
                <span className="action-icon">💹</span>
                <span>Buy Stocks</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📉</span>
                <span>Sell Stocks</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">💰</span>
                <span>Add Funds</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📄</span>
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;