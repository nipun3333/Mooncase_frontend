import React, { FunctionComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const data = [
  {
    name: "April",

    NFT: 3908,
    amt: 2000,
  },
  {
    name: "June",

    NFT: 4800,
    amt: 2181,
  },
  {
    name: "July",

    NFT: 3800,
    amt: 2500,
  },
  {
    name: "Aug",

    NFT: 4300,
    amt: 2100,
  },
  {
    name: "Sept",

    NFT: 3908,
    amt: 2000,
  },
  {
    name: "Oct",

    NFT: 4800,
    amt: 2181,
  },
  {
    name: "Nov",

    NFT: 3800,
    amt: 2500,
  },
  {
    name: "Dec",

    NFT: 4300,
    amt: 2100,
  },
  {
    name: "Jan",

    NFT: 2400,
    amt: 2400,
  },
  {
    name: "Feb",

    NFT: 1398,
    amt: 2210,
  },
  {
    name: "March",

    NFT: 9800,
    amt: 2290,
  },
];

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function GraphComp() {
  return (
    <LineChart
      //   width={500}
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid horizontalPoints />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="NFT" stroke="red">
        {/* <LabelList content={<CustomizedLabel />} /> */}
      </Line>
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
}
