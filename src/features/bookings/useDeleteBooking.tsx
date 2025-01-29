import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export function useDeleteBooking(){
  const queryClient = useQueryClient()
  
  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteBooking(id),

    onSuccess: () => {
      toast.success(`Booking Successfully Deleted`)
      queryClient.invalidateQueries({
        queryKey: ["bookings"]
      })
    },

    onError: () => {
      toast.error("An Error Occured Deleting the booking")
    }
  })

  return {
    deleteBook,
    isDeleting
  }
}
