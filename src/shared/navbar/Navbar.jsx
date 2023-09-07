import logoB from '../../assets/lll.png'

const Navbar = () => {

    const navItems =
        <>
            <li className='font-semibold uppercase'><a>Home</a></li>
            <li className='font-semibold uppercase'><a>Colleges</a></li>
            <li className='font-semibold uppercase'><a>Admission</a></li>
            <li className='font-semibold uppercase'><a>My College</a></li>
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
                <div className="navbar-end">
                    <a className="space-x-2 font-semibold uppercase"><span>Login</span> <span>|</span> <span>Register</span></a>
                </div>
            </div>

        </div>
    );
};

export default Navbar;