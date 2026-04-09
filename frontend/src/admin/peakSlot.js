import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const PeakSlotChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="slot" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#16a34a" />
    </BarChart>
  </ResponsiveContainer>
);

export default PeakSlotChart;
