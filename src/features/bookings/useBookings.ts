import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";


export function useAllBookings(){
  const { isLoading, error, data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings
  })

  return { bookings, isLoading, error }
}