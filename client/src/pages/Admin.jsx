import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("you are not authorized");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Total Jobs"
        count={jobs}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
