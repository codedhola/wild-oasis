import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser(){
  const { isPending, data: user} = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ["users"]
  })

  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated"
   }
}