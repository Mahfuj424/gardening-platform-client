/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function UserVerificationChart() {
  const { data: userData } = useGetAllUserQuery(undefined);
  const allUser = userData?.data || [];

  // Calculate the counts for verified and unverified users
  const verifiedCount = allUser.filter(
    (user: { isVerified: any }) => user.isVerified
  ).length;
  const unverifiedCount = allUser.length - verifiedCount;

  // Data array for the chart
  const chartData = [
    { name: "Verified", value: verifiedCount },
    { name: "Unverified", value: unverifiedCount },
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
