import axios from "axios";
import { QueryClient } from "react-query";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// const BASE_URL = "https://public-ericha-poohghg.koyeb.app";

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  PRODUCTS_MAINDATA: ["PRODUCTS", "MAIN"],
  CART: "CART",
  USER: "USER",
  USER_AUTH: "USER_AUTH",
};

// https://2ham-s.tistory.com/407
export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      });
    return client;
  };
})();

export const auth = axios.create({
  baseURL: `${BASE_URL}/graphql`,
  withCredentials: true,
});

export const authFetcher = async (query: string, variables: {} = {}) => {
  try {
    const res = await auth.request({
      method: "post",
      data: { query, variables },
    });
    const data = res.data;
    if (data.errors && data.errors.length) throw data?.errors.join("");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
