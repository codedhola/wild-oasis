import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function useChekin(){
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkin, isPending: isCheckin } = useMutation({
    mutationFn: ({bookingId, breakfast}: any) => updateBooking(bookingId, {
      is_paid: true,
      status: "checked-in",
      ...breakfast
    }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} has been checked-in Successfully`)
      queryClient.invalidateQueries()
      navigate("/")
    },

    onError: (err) => {
      toast.error(`An Error Occured ${err.message}`)
    }
  })

  return {
    checkin,
    isCheckin
  }
}