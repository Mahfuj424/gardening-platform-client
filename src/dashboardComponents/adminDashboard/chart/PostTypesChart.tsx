/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllPostsQuery } from "@/redux/api/post";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#22C55E", "#00C49F"];

export function PostTypesChart() {
  const { data } = useGetAllPostsQuery({});
  const postData = data?.data || [];

  // Calculate the counts for regular and premium posts
  const premiumCount = postData.filter(
    (post: { isPremium: any }) => post.isPremium
  ).length;
  const regularCount = postData.length - premiumCount;

  // Data array for the chart
  const chartData = [
    { name: "Regular", value: regularCount },
    { name: "Premium", value: premiumCount },
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
