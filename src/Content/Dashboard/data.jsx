import React from "react";

const tempDummyData = [
  { name: "1537553667", opTemp: 74, suTemp: 2.2 },
  { name: "1536437598", opTemp: 64, suTemp: 0.7 },
  { name: "1538261220", opTemp: 12, suTemp: 1.6 },
  { name: "1537553961", opTemp: 79, suTemp: 0.8 },
  { name: "1534826828", opTemp: 82, suTemp: 5.1 },
  { name: "1537553756", opTemp: 78, suTemp: 12 },
  { name: "1536433964", opTemp: 23, suTemp: 2.0 },
  { name: "1537553766", opTemp: 89, suTemp: 2.1 },
  { name: "1537553764", opTemp: 28, suTemp: 6.2 },
  { name: "1534826792", opTemp: 66, suTemp: 10 },
  { name: "1536437529", opTemp: 86, suTemp: 3.1 },
  { name: "1536434128", opTemp: 33, suTemp: 10 }
];

const data = [
  { name: "18-24", uv: 31.47, pv: 2400, fill: "#8884d8" },
  { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
  { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
  { name: "35-39", uv: 8.22, pv: 9800, fill: "#82ca9d" },
  { name: "40-49", uv: 8.63, pv: 3908, fill: "#a4de6c" },
  { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
  { name: "unknow", uv: 6.67, pv: 4800, fill: "#ffc658" }
];

const data1 = [
  { name: "Page A", uv: 4000, female: 2400, male: 2400 },
  { name: "Page B", uv: 3000, female: 1398, male: 2210 },
  { name: "Page C", uv: 2000, female: 9800, male: 2290 },
  { name: "Page D", uv: 2780, female: 3908, male: 2000 },
  { name: "Page E", uv: 1890, female: 4800, male: 2181 },
  { name: "Page F", uv: 2390, female: 3800, male: 2500 },
  { name: "Page G", uv: 3490, female: 4300, male: 2100 }
];

const data2 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const data3 = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "Geography", A: 99, B: 100, fullMark: 150 },
  { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  { subject: "History", A: 65, B: 85, fullMark: 150 }
];

const data4 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 }
];

const data5 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
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

const RadialBarChartStyle = {
  top: 0,
  left: "5%",
  lineHeight: "24px"
};

export {
  renderCustomizedLabel,
  RadialBarChartStyle,
  data,
  data1,
  data2,
  data3,
  data4,
  data5,
  colors,
  tempDummyData
};
