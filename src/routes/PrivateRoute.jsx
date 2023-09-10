import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { PropagateLoader } from "react-spinners";
import { AuthContext } from "../providers/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log()

    if(loading){
        console.log('hi')
        return <PropagateLoader color="#DC2828" />
    }

    if (user) {
        return children;
    }
    console.log('hi')
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;