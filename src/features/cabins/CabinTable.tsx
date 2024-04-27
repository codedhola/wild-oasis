import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import React from "react";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />;

  const filteredValue = searchParams.get("discount") || "all"

  let filteredCabin: any
  if(filteredValue === "all") filteredCabin = cabins
  if(filteredValue === "with-discount") filteredCabin = cabins?.filter((cabin: any) => cabin.discount === 0)
  if(filteredValue === "no-discount") filteredCabin = cabins?.filter((cabin: any) => cabin.discount !== 0)

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabin.sort(
    (a: any, b: any) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <React.Fragment>
          <Table.Header>
            <React.Fragment>
              <div></div>
              <div>Cabin</div>
              <div>Capacity</div>
              <div>Price</div>
              <div>Discount</div>                                            
              <div></div>
            </React.Fragment>
          </Table.Header>
          <Table.Body 
          data={filteredCabin}
          render={(cabin: any) => (
            <CabinRow cabin={cabin} key={filteredCabin.id} />
          )}
          />
        </React.Fragment>
      </Table>
    </Menus>
  );
}

export default CabinTable;