import styled from "styled-components";
import Today from "../check-in-out/TodayActivity";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import { Stats } from "./Stats";
import { useCabins } from "../cabins/useCabin";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout(){
  const { bookings, isBooking } = useRecentBookings()
  const { stays, isStaying, confirmedStays, numDays } = useRecentStays()
  const { cabins, isPending } = useCabins()

  if(isBooking || isStaying || isPending ) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={Number(cabins?.length)} />
      <Today />
      <div>charts</div>
      <div>charts others</div>
    </StyledDashboardLayout>
  )
}