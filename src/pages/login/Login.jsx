import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import GoogleLogin from '../../shared/GoogleLogin';
import { AuthContext } from '../../providers/AuthProvider';


const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const onSubmit = data => {

        console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                reset();
                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: 'User Login successful.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
    };


    return (
        <div className='reltive'>
            <Helmet>
                <title>Academia | Login</title>
            </Helmet>

            <h3 className='font-monoton-xl opacity-10 text-gray-500  whitespace-nowrap text-center -rotate-90 absolute -left-48 top-[40%] '>login</h3>

            <div className="pt-36 min-h-screen bg-white">
                <div className='w-[40%] mx-auto flex justify-center'>
                    <div className="card w-full pb-10  flex-shrink-0 shadow-2xl bg-base-100  ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-gray-800">Email</span>
                                </label>
                                <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered border-gray-700 border" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-gray-800">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered border-gray-700 border" />
                                {errors.password && <span className="text-red-600">Password is required</span>}
                                <label className="label">
                                    <a href="#" className="text-gray-500 link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-lime-700 text-white">Login</button>
                            </div>
                            <div className='flex mt-6 justify-center'>
                                <Link to='/signup'>Don't Have an account? <span className='text-lime-600 font-bold'>Sign up</span></Link>
                            </div>
                        </form>
                        <div className='w-3/4 mx-auto flex justify-center'>
                            <GoogleLogin></GoogleLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
