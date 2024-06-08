import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail({ booking }: any) {  
  const moveBack = useMoveBack();
  const navigate = useNavigate()
  const { id: bookingId, status } = booking

  const statusToTagName : any = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { checkout, isCheckingOut } = useCheckout()
  const { isDeleting, deleteBook} = useDeleteBooking()

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}

      <Modal>

        <ButtonGroup>
          {status === "unconfirmed" && (
              <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
                Check in
              </Button>
            )}
          {status === "checked-in" && (
            <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
              Check out
            </Button>
          )}
          <Modal.Open opens={"delete"}>
            <Button variation="danger" disabled={isDeleting}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
            <ConfirmDelete 
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBook(bookingId, { 
                  onSettled: () => navigate(-1)
                })
              }}
              />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
