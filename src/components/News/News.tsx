import { Avatar, Card, Col, Row, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import { useGetCryptosQuery } from '../../redux/Api/apiCoinRanking';
import { useGetNewsQuery } from '../../redux/Api/apiCryptoNews';
import './News.css';


interface INews {
  simplified?: boolean;
}
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = (props: INews) => {
  const [newsCategory, setNewsCategory] = useState<string>('Cryptocurrency');

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews }: any = useGetNewsQuery({
    newsCategory: newsCategory,
    count: props.simplified ? 6 : 12,
  });

  useEffect(() => {
    document.title = 'Cryptocurrencies and News';
  },[])

  if (cryptoNews?.articles.length < 1) return <div>Loading...</div>;

  return (
    <Row gutter={[24, 24]}>
      {!props.simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select news topic"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option: any) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="Cryptocurrency">All</Select.Option>
            {data?.data?.coins.map((coin: any, index: number) => (
              <Select.Option value={coin.name} key={index}>
                {coin.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.articles.map((news: any, index: number) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreffered">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img src={news?.image || demoImage} alt="News" />
              </div>
              <p>
                {news?.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.image || demoImage}
                    alt="news"
                  />
                  <Text className="provider-name">{news?.source.name}</Text>
                </div>
                <Text>{moment(news?.publishedAt).startOf('s').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
