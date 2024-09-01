import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", sales: 30 },
  { name: "February", sales: 20 },
  { name: "March", sales: 27 },
  { name: "April", sales: 18 },
  { name: "May", sales: 23 },
  { name: "June", sales: 34 },
];

const MostPopular = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data || []}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MostPopular;
