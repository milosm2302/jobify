import React from "react";
import { useAllJObsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { data } = useAllJObsContext();

  return <div>search container</div>;
};

export default SearchContainer;
