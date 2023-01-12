import { Typography, Row, Col, Statistic } from 'antd';
import Title from 'antd/lib/typography/Title';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../redux/Api/apiCoinRanking';
import Cryptocurrencies from '../Cryptocurrencies/Cryptocurrencies';
import News from '../News/News';

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <div>"Loading . . ."</div>;
  return (
    <>
      <Typography.Title style={{ color: '#51545a' }} level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Totaol Cryptocurrencies" value={globalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Totaol Exchanges" value={millify(globalStats?.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Totaol 24h Volume" value={millify(globalStats?.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Totaol Markets" value={millify(globalStats?.totalMarkets)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title style={{ color: '#51545a' }} level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title style={{ color: '#51545a' }} level={2} className="home-title">
          Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default HomePage;
