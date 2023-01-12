import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../redux/Api/apiCoinRanking";
import "./Cryptocurrencies.css";

interface ICryptocurrencies {
  simplified?: boolean;
}

const Cryptocurrencies = (props: ICryptocurrencies) => {
  const count = props.simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <div>Loading ...</div>;
  return (
    <>
      {!props.simplified ? (
        <div className="search-crypto">
          <Input
            placeholder="Enter the name"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      ) : undefined}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin: any) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={
                  <img className="crypto-image" src={coin.iconUrl} alt="#" />
                }
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
