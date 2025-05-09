"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/mutations/userMutations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Link from "next/link";

const LoginPage = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const { mutate, isPending } = useLogin();
  useEffect(() => {
    if (isPending) {
      toast.loading("Loading...", {
        toastId: "loading",
        autoClose: false,
      });
    } else {
      toast.dismiss("loading");
    }
  }, [isPending]);
  return (
    <div className="flex min-h-screen  items-center justify-center Container">
      <div className="max-w-[400px] w-full mx-auto ">
        <p className="text-[18px] text-center my-4">
          Make the most of your professional life
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
        <Link
          href="/signup"
          className=" my-3 text-slate-950 font-medium text-[18px] flex items-center justify-center gap-1 "
        >
          <p>{"Don't have an account?"}</p>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="#0F172B"
              d="M13 5.499a.996.996 0 0 0-1 1v2.559c-4.5.498-8 4.309-8 8.941v1c2.245-3.423 5.25-3.92 8-3.989v2.489a.999.999 0 0 0 1.707.707L20 11.999l-6.293-6.208A1 1 0 0 0 13 5.499"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
