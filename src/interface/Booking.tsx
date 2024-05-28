import BookingDetail from '../features/bookings/BookingDetail'
import { useBooking } from '../features/bookings/useBookings';

type Props = {}

const Booking = ({ }: Props) => {

  const { booking } = useBooking()

  return (
    <div>
      <BookingDetail booking={booking} />
    </div>
  )
}

export default Booking