import { Dispatch, SetStateAction } from "react";
import Navbar from "./Navbar"

type props = {
    sidebarToggle: boolean;
    setSidebarToggle: Dispatch<SetStateAction<boolean>>;
}

const Dashboard = ({sidebarToggle, setSidebarToggle}: props) => {
  return (
    <div className={`${sidebarToggle  ? "": "ml-64"} w-full`}>
      <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
    </div>
  )
}

export default Dashboard