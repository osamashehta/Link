import { cookies } from "next/headers";
import apiServiceCall from "../api/apiServiceCall"

export const fetchUserProfile = async ()=> {
    const cookieStore =  await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("token apisecerver", token);
    
    return apiServiceCall({
        endPoint: "users/profile-data",
        headers: { "token": token || "" },
    });
}
