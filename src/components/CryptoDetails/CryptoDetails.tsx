import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Col, Row, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../redux/Api/apiCoinRanking';
import LineChart from '../LineChart/LineChart';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState<string>('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  if (isFetching) return <div>Loading...</div>;
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name}({cryptoDetails.symbol}) Price
        </Title>
        <p>{cryptoDetails.name} live price</p>
      </Col>
      <Select
        defaultValue={'7d'}
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Select.Option key={date}>{date}</Select.Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistic
            </Title>
            <p>An overview showing the statistic of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistic
            </Title>
            <p>An overview showing the statistic of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <div>
            <p style={{ fontSize: '25px', fontWeight: 'bold' }}>What is {cryptoDetails.name}</p>
            {HTMLReactParser(cryptoDetails.description)}
          </div>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
            {cryptoDetails.links.map((link: any) => (
              <Row className="coin-link" key={link.url}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Title>
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
