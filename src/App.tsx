import React from 'react';
import Navbar from './components/NavBar/Navbar';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import Cryptocurrencies from './components/Cryptocurrencies/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';
import News from './components/News/News';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Crypto <br />
            2022 / sergio1811x / ©
          </Typography.Title>
          <Space onClick={() => window.scrollTo(0, 0)}>
            <Link style={{ color: '#f0b90b' }} to={'/'}>
              Home
            </Link>
            <Link style={{ color: '#f0b90b' }} to={'/cryptocurrencies'}>
              Cryptocurrencies
            </Link>
            <Link style={{ color: '#f0b90b' }} to={'/news'}>
              News
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
