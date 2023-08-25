import { toast } from "react-toastify";
import { AppError } from "../services/appError";
import axios from "../services/axiosInstance";
import { useEffect, useState } from "react";

const useGetApi = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiGet = async () => {
      let get = await axios.get(url);
      console.log(get);
      setData(get?.data?.data?.chats);
    };
    apiGet();
  }, [url]);
  return data;
};

const postApi = async (url, data) => {

    try {
         const get = await axios.post(url, data, {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("Chat-App-Token")
                  ? localStorage.getItem("Chat-App-Token")
                  : "no"
              }`,
            },
          });

          toast.success(AppError(get));
          return get.data;
    } catch (error) {
          toast.warn(AppError(error));
    }
};

export { useGetApi, postApi };
