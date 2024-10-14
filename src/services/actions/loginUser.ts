"use server";
import { FieldValues } from "react-hook-form";

export const loginUser = async (values: FieldValues) => {
  const res = await fetch(
    `https://gardening-tips-platform-server.vercel.app/api/v1/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      cache: "no-cache",
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
