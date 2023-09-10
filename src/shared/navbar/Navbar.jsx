import { Link } from 'react-router-dom';
import logoB from '../../assets/lll.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { BeatLoader } from 'react-spinners';
import { FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logOut, loading } = useContext(AuthContext);
    const [myAdmissionInfo, setMyAdmissionInfo] = useState({});

    useEffect(() => {
        if (!loading && user && user.email) {
            fetch(`http://localhost:5000/my-admission-info?email=${user?.email}`)
                .then(res => res.json())
                .then(data => setMyAdmissionInfo(data));
        }
    }, [loading, user])



    if (loading) {
        return <BeatLoader color="#DC2828" />
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logged out!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    }

    const navItems =
        <>
            <li><Link to='/' className='font-semibold uppercase'><a>Home</a></Link></li>
            <li><Link to='/colleges' className='font-semibold uppercase'><a>Colleges</a></Link></li>
            <li><Link to='/admission' className='font-semibold uppercase'><a>Admission</a></Link></li>
            <li><Link to={`/my-college-details/${myAdmissionInfo?.collegeId}`} className='font-semibold uppercase'><a>My College</a></Link></li>
        </>

    return (
        <div className='px-10 absolute top-0 bg-white bg-opacity-80 w-full z-20'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
                    <img className='w-[40%]' src={logoB} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>

                {/*  */}
                {/* <div className="navbar-end">
                    <a className="space-x-2 font-semibold uppercase"><Link to='/login'>Login</Link> <span>|</span> <Link to='/signup'>Register</Link></a>
                </div> */}

                <div className="navbar-end">
                    <div className='md:flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 md:items-center hidden '>
                        {
                            user &&
                            <>
                                {
                                    user.displayName ?
                                        <>
                                            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                                {
                                                    user.photoURL ? <Link to='/profile'><img className='rounded-full w-11 h-11 object-cover' src={user.photoURL} alt="" /></Link>
                                                        : <FaUserCircle className='w-10 h-10 text-gray-500' />
                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            {
                                                user.photoURL ? <Link to='/profile'><img className='rounded-full w-9 h-9 object-cover' src={user.photoURL} alt="" /></Link>
                                                    : <FaUserCircle className='w-10 h-10 text-gray-500' />
                                            }
                                        </>
                                }
                            </>
                        }
                        {/* <span className='hidden w-px h-6 bg-gray-300 md:block'></span> */}
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                            {
                                user ?
                                    <a onClick={handleLogOut} className="space-x-2 font-semibold uppercase">LogOut</a>
                                    :
                                    <a className="space-x-2 font-semibold uppercase"><Link to='/login'>Login</Link> <span>|</span> <Link to='/signup'>Register</Link></a>
                            }
                        </div>
                    </div>
                    {/* </label> */}

                </div>



                {/*  */}
            </div>

        </div>
    );
};

export default Navbar;