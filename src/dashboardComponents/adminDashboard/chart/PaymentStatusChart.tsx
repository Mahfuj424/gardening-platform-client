"use client";

import { useGetAllUserQuery } from "@/redux/api/userApi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#22C55E", "#00C49F"];

export function PaymentStatusChart() {
  const { data } = useGetAllUserQuery(undefined);
  const allUser = data?.data || [];

  // Calculate the counts for successful and failed payments based on premiumAccess
  const successfulCount = allUser.filter(
    (user: { premiumAccess: boolean }) => user.premiumAccess === true
  ).length;
  const failedCount = allUser.length - successfulCount;

  // Data array for the chart
  const chartData = [
    { name: "Successful", value: successfulCount },
    { name: "Failed", value: failedCount },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
