"use server";
import { FieldValues } from "react-hook-form";

export const registerUser = async (values: FieldValues) => {
  // console.log('hooks clg=>',values);
  const res = await fetch(
    `https://gardening-tips-platform-server.vercel.app/api/v1/user/create-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      cache: "no-cache",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
