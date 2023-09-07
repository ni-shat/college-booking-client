import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";


const Main = () => {
    return (
        <div className="bg-white pt-3 text-gray-800">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;