import React from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
  return (
    <React.Fragment>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </React.Fragment>
  );
}

export default Bookings;
