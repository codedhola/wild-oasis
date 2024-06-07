import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useChekin } from "./useChekin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)
  const [addBreakFast, setAddBreakFast] = useState<boolean>(false)
  const { booking, isLoading } = useBooking()
  const { checkin, isCheckin} = useChekin()
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.is_paid), [booking])

  // const booking = {};
  if(isLoading || isLoadingSettings) return <Spinner />

  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  console.log("Breakfast => ", has_breakfast)
  const optionalBreakfastPrice =
    settings.breakfast_price * num_nights * num_guests;

  function handleCheckin() {
    if(!confirmPaid) return 
    if(addBreakFast){
      checkin({ bookingId, breakfast: {
        has_breakfast: true,
        extra_price: optionalBreakfastPrice,
        total_price: total_price + optionalBreakfastPrice,
      }})
    }else {
      checkin({bookingId, breakfast: { }})
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && <Box>
        <Checkbox 
        id="breakfast"
        checked={addBreakFast}
        onChange={() => {
          setConfirmPaid(false)
          setAddBreakFast((add) => !add)
        }}
        disabled={false}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox 
          id={bookingId}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((val) => !val)}
          disabled={confirmPaid}
          >
          I confirmed that {guests.fullName} has paid the total amount of #{}
          {!addBreakFast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckin} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
