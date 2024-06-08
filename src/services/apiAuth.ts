import toast from "react-hot-toast";
import supabase from "./supabase";

export async function Login({ email, password}: any){
 
let { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})
 
  if(error) {
    toast.error(error.message)
    throw new Error(error.message)
  } 
  console.log("Data => ", data)
  return data;
}