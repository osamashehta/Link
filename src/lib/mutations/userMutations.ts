import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "../api/apiServiceCall";
import { toast } from "react-toastify";
import { LoginData, SignUpData } from "../types/types";
import { useRouter } from "next/navigation";
const signUp = async (data: SignUpData) => {
  return apiServiceCall({
    endPoint: "users/signup",
    method: "POST",
    body: data,
  });
};
export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      router.push("/login");
    },
    onError: (error: { data?: { error?: string } }) => {
      toast.error(error?.data?.error);
      console.log(error);
    },
  });
};

const logIn = async (data: LoginData) => {
  return apiServiceCall({
    endPoint: "users/signin",
    method: "POST",
    body: data,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => logIn(data),
    onSuccess: async (data) => {
      toast.success(data?.data?.message);
      console.log("data login", data);
      console.log("data?.data?.token login", data?.data?.token);

      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: data?.data?.token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/";
    },
    onError: (error: { data?: { error?: string } }) => {
      toast.error(error?.data?.error);
      console.log("error login", error.data);
    },
  });
};
