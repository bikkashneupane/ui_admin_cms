import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const OrderChart = ({ orderChartData = [] }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      className="bg-[#1E1E1E] rounded-lg text-green-700"
    >
      <h2 className="text-lg font-semibold py-2 text-center ">Order Status</h2>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={orderChartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Tooltip />
        <Radar
          dataKey="total"
          stroke="purple"
          fill="#8E24AA"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
export default OrderChart;
