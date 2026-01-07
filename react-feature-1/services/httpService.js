import { createService } from "./core";
import { LOGGING_SERVICE } from "./constants";

const topic = process.env.NODE_ENV === "production" ? LOGGING_SERVICE.DEBUG_PROD : LOGGING_SERVICE.DEBUG_STG;

const httpService = createService({
  baseURL: "https://hyte.com",
  headers: {},
  topic,
});

export default httpService;
