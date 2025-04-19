import axios from "axios";
type ApiServiceCallProps = {
  endPoint: string;
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};
const apiServiceCall = async ({
  endPoint,
  method,
  body,
  headers,
}: ApiServiceCallProps) => {
  
  
  

  
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
      method: method || "GET",
      data: body,
      headers:{
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      };
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default apiServiceCall;
