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
  return data;
}


export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}