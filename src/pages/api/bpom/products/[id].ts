// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { env } from "@/env.mjs";
import { MedicineType } from "@/typings/app";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `${env.NEXT_PUBLIC_BACKEND_URL}/bpom/products/${req.query.id}`
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Not Found" });
  }
}
