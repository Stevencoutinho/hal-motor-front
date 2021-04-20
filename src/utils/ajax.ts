/* import */
import axios from "axios";
import { process } from "@/types";
/* type */
interface Config {
  url: string;
  method: string;
  data?: any;
};

/* ajax */
const ajax = (config: Config) => {
  const client = axios.create({
    baseURL: process.env.API_PATH,
    headers: { "Content-Type": "application/json" }
  });

  switch(config.method) {
    case "GET":
      return client.get<History>(config.url);
    case "POST":
      return client.post<History>(config.url);
    case "PUT":
      return;
    case "DELETE":
      return;
  }
};

export default ajax;

