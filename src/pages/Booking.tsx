import BookingDetail from '../features/bookings/BookingDetail'
import { useBooking } from '../features/bookings/useBooking';
import Spinner from '../ui/Spinner';

type Props = {}

const Booking = ({ }: Props) => {
  const { booking, isLoading } = useBooking()

  if(isLoading) return <Spinner />

  return (
      <BookingDetail booking={booking} />
  )
}

export default Booking