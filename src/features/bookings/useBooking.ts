import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking(){
  const params = useParams();

  const bookingId = params.id

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId)
  })

  return { booking, isLoading, error }
}