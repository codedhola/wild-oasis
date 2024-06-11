import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin(){
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password}: any) => LoginApi({ email, password}),

    onSuccess: (data: any) => {
      toast.success("Logged in successful")
      queryClient.setQueryData(["user"], data)
      navigate("/")
    },

    onError: (error: any) => {
      console.log("Error => ", error.message)
    }
  })

  return {
    login,
    isLogin
  }
}