import { NextApiRequest, NextApiResponse } from "next";
import httpService from "../../../services/httpService";
export default async function getTodo(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    const result = await httpService.get("https://jsonplaceholder.typicode.com/todos/1");
    return res.status(400);
  }
}
