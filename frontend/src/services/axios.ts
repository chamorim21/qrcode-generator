import axios from "axios";

export default function getApi(source: "server" | "client") {
  const baseURL =
    source === "server"
      ? process.env.NEXT_PUBLIC_API_URL_FROM_SERVER
      : process.env.NEXT_PUBLIC_API_URL_FROM_CLIENT;
  return axios.create({
    baseURL,
  });
}
