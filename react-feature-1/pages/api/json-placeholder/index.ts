import { NextApiRequest, NextApiResponse } from "next";
import httpService from "../../../services/httpService";
export default async function getTodo(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400);
  }
  console.log("req", req);
  const result = await httpService.get("https://jsonplaceholder.typicode.com/todos/1");
  return res.status(200).json(result.data);
}
