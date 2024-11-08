/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllPostsQuery } from "@/redux/api/post";
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

export function TopPostsChart() {
  const { data } = useGetAllPostsQuery({});
  const allPost = data?.data || [];

  // Process top posts based on upvotes and comments
  const topPosts = allPost
    .map((post: { title: string; likes: any; comments: string | any[] }) => ({
      name: post.title.slice(0, 20) + (post.title.length > 20 ? "..." : ""), // Shorten title if too long
      upvotes: Array.isArray(post.likes) ? post.likes.length : 0,
      comments: Array.isArray(post.comments) ? post.comments.length : 0,
    }))
    .sort(
      (
        a: { upvotes: any; comments: any },
        b: { upvotes: any; comments: any }
      ) => b.upvotes + b.comments - (a.upvotes + a.comments)
    ) // Sort by combined upvotes and comments
    .slice(0, 5); // Get top 5 posts

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={topPosts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="upvotes" stackId="a" fill="#00C49F" />
        <Bar dataKey="comments" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
