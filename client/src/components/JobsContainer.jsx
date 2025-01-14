import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJObsContext } from "../pages/AllJobs";

const JobsContainer = () => {
  const { data } = useAllJObsContext();
  const { jobs } = data;
  if (jobs.lenght === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
