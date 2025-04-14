import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "../api/apiServiceCall";
import { toast } from "react-toastify";
import { SignUpData } from "../types/types";
const signUp = async (data:SignUpData)=> {
    return apiServiceCall({
        endPoint: "users/signup",
        method: "POST",
        body: data,
    });
}
export const useSignUp = () => {
    return useMutation({
      mutationKey: ["signUp"],
      mutationFn: (data: SignUpData) => signUp(data),
      onSuccess:(data)=>{
        toast.success(data?.data?.message);
      },
      onError: (error: { data?: { error?: string } }) => {
        toast.error(error?.data?.error);
        console.log(error);
        
      },
    });
  };