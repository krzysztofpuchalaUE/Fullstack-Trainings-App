import { Outlet } from "react-router-dom";
import UserTrainingsComp from "../components/UserTrainings/UserTrainingsComp";
export default function UserTrainingsPage() {
  return (
    <>
      <UserTrainingsComp />
      <Outlet />
    </>
  );
}
