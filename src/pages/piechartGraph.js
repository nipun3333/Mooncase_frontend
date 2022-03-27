import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "DAI", value: 100 },
  // { name: "LUNA", value: 300 },
  // { name: "UNI", value: 300 },
  // { name: "MANA", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Piechart() {
  return (
    <div className="">
      <ResponsiveContainer width={600} height={600}>
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    // <ResponsiveContainer width="100%" height="100%">
    //   <PieChart>
    //     <Pie
    //       data={data}
    //       cx={200}
    //       cy={200}
    //       labelLine={false}
    //       label={renderCustomizedLabel}
    //       outerRadius={80}
    //       fill="#8884d8"
    //       dataKey="value"
    //     >
    //       {data.map((entry, index) => (
    //         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //       ))}
    //     </Pie>
    //   </PieChart>
    // </ResponsiveContainer>
  );
}
