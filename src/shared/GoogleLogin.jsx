import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ggl from '../assets/google.png'
import { AuthContext } from "../providers/AuthProvider";


const GoogleLogin = () => {

    const { googleSignIn, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }

                fetch(`http://localhost:5000/users?email=${user?.email}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div onClick={handleGoogleSignIn} className="flex gap-2 items-center   border-gray-400 rounded-full py-1 px-10 -mt-2 border text-black hover:bg-gray-100 hover:cursor-pointer hover:border-lime-400 ">
            <p>Connect With Google</p>
            <img className='h-8 w-8' src={ggl} alt="" />
        </div>
    );
};

export default GoogleLogin;