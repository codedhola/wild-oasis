import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout(){
  const queryClient = useQueryClient()

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) => updateBooking(bookingId, {
      status: "checked-out",
    }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} has been checked-out Successfully`)
      queryClient.invalidateQueries()
    },

    onError: (err) => {
      toast.error(`An Error Occured ${err.message}`)
    }
  })

  return {
    checkout,
    isCheckingOut
  }
}