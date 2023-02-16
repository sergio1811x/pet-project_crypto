import React, { useEffect, useState } from 'react';
import { Avatar, Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons';
import './NavBar.css';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={require('../../images/cryptocurrency.png')} size="large" />
        <Typography.Title type={"secondary"} level={2}  className="logo">
          <Link to="/">Crypto</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu   theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key={1} icon={<HomeOutlined />}>
            <Link to={'/'}>Home</Link>
          </Menu.Item>
          <Menu.Item key={2} icon={<FundOutlined />}>
            <Link to={'/cryptocurrencies'}>CryptoCurrencies</Link>
          </Menu.Item>
          <Menu.Item key={3} icon={<BulbOutlined />}>
            <Link to={'/news'}>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
