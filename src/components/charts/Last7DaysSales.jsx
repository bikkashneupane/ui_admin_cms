import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Last7DaysSale = ({ last7DaysSalesdata = [] }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      className="bg-gray-800 rounded-lg text-green-500"
    >
      <h2 className="text-lg font-semibold py-2 text-center ">
        Sales Over the Past 7 Days
      </h2>

      <AreaChart
        data={last7DaysSalesdata}
        margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="name" />
        <YAxis
          tick={{ fill: "green" }}
          tickFormatter={(tick) => `$${tick}`} // Inline function to format Y-axis
        />

        <Tooltip />
        <Area type="monotone" dataKey="sales" fill="#00796B" stroke="purple" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Last7DaysSale;
