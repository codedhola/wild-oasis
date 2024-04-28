import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export function useAllBookings(){
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { isLoading, error, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page})
  })

  return { bookings, isLoading, error }
}