"use client"
import apiServiceCall from "@/lib/api/apiServiceCall";
import { useQuery } from "@tanstack/react-query";

const HomePage =  ({token}:{token:string}) => {
  

  const {data,isLoading} = useQuery({
    queryKey:["test"],
    queryFn:()=>apiServiceCall({
      endPoint:"posts?limit=50",
      headers:{
        token:token
      }
    })
  })
  // console.log("data home",data);
  
  return (
    <>
      <div>test</div>
    </>
  );
};

export default HomePage;
