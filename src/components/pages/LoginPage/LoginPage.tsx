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



const LoginPage = () => {
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6,{message:"Password must be at least 6 characters."}).regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
          }
        ),
      })
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

      const {mutate,isPending} = useLogin();
useEffect(()=> {
    if(isPending){
        toast.loading("Loading...",{
            toastId:"loading",
            autoClose:false
        })
    }else {
        toast.dismiss("loading");
    }
},[isPending])
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
          

        

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default LoginPage