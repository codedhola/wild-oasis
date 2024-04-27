type Props = {
  options: any
}

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: any) {
    console.log("Sorting by ", sortBy)
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
