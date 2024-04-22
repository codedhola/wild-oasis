import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CardTableOperations from "../features/cabins/CardTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CardTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>

    </>
  );
}

export default Cabins;
