import { Col, Row } from "antd";
import Typography from "antd/lib/typography";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ILineChart {
  coinHistory: any;
  currentPrice: string;
  coinName: string;
}

const LineChart = (props: ILineChart) => {
  const coinPrice = [];
  const coinTimeStamp: any = [];

  for (let i = props.coinHistory?.data?.history?.length - 1; i > 0; i--) {
    coinPrice.push(props.coinHistory?.data?.history[i].price);
    coinTimeStamp.push(
      new Date(
        props.coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {props.coinName} Price chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {props.coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {props.coinName} Price: $ {props.currentPrice}
          </Typography.Title>
        </Col>
      </Row>

      <Line data={data} options={options as any} />
    </>
  );
};

export default LineChart;
