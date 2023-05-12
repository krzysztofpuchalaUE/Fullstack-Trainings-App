import UserTrainings from "../components/UserTrainings/userTrainings";
import { Outlet } from "react-router-dom";

export default function UserTrainingsPage() {
  return (
    <>
      <UserTrainings />
      <Outlet />
    </>
  );
}
