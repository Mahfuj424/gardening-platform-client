/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllUserQuery } from "@/redux/api/userApi";
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

export function UserActivityChart() {
  const { data } = useGetAllUserQuery(undefined);
  const allUser = data?.data || [];

  // Calculate counts for users with and without posts
  const withPostsCount = allUser.filter(
    (user: { posts: string | any[] }) => user.posts?.length > 0
  ).length;
  const withoutPostsCount = allUser.length - withPostsCount;

  // Data for the chart
  const chartData = [
    { name: "With Posts", value: withPostsCount },
    { name: "Without Posts", value: withoutPostsCount },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
}
