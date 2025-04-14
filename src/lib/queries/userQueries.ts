import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "../api/apiServiceCall"

const fetchUserProfile = async ()=> {
    return apiServiceCall({
        endPoint: "/user/profile",
    });
}
export const useUserProfile = ()=> {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
    })
}