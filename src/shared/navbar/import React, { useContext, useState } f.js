import React, { useContext, useState } from 'react';
// import bg from ''
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import GoogleLogin from '../shared/social-login/GoogleLogin';
import { Helmet } from 'react-helmet';
import Footer from '../shared/footer/Footer';
import { BeatLoader } from 'react-spinners';

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const { createUser, updateUserProfile, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = data => {

        console.log(data)

        const formData = new FormData();
        formData.append('image', data.photoURL[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse);

                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);

                    // const saveUser = {
                    //     name: data.name,
                    //     email: data.email,
                    //     userImage: imgURL,
                    //     location: data.address,
                    //     role: 'student',
                    //     phone: data.phone
                    // }
                    // console.log(saveUser)


                    // write fecth after that
                    // create user using firebase
                    createUser(data.email, data.password)
                        .then(result => {
                            const loggedUser = result.user;
                            console.log(loggedUser);

                            updateUserProfile(data.name, imgURL) // update user profile
                                .then(() => {
                                    const saveUser = {
                                        name: data.name,
                                        email: data.email,
                                        userImage: imgURL,
                                        location: data.address,
                                        role: 'student',
                                        phone: data.phone
                                    }
                                    // after successfully updating start axios fetch
                                    fetch(`http://localhost:5000/users?email=${user?.email}`, {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify(saveUser)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.insertedId) {
                                                reset();
                                                setIsLoading(false);
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'success',
                                                    title: 'User created successfully.',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                });
                                                navigate('/');
                                            }
                                        })
                                    //start normal fetch

                                    // end normal fetch

                                })
                                .catch(error => {
                                    console.log(error)
                                    setIsLoading(false);
                                })
                        })
                    // end creating user, updating user data, post data to db


                }
            })



    };


    return (
        <div className='bg-[../../assets/bg-signup.svg] bg-cover bg-center'>
            <Helmet>
                <title>TALENTO | Signup</title>
            </Helmet>

            <h3 className='font-monoton-lg opacity-10 text-gray-500  whitespace-nowrap text-center -rotate-90 absolute -left-52 top-[42%] '>Signup</h3>

            <div className="pt-32 pb-0 bg-white">
                <div className="flex w-[80%] mx-auto items-center justify-center ">
                    <div className='w-[65%]'>
                        <div className="card w-full pb-10  flex-shrink-0 shadow-2xl bg-base-100  ">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className='flex gap-4'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Name</span>
                                        </label>
                                        <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.name && <span className="text-red-600">Name is required</span>}
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Email</span>
                                        </label>
                                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.email && <span className="text-red-600">Email is required</span>}
                                    </div>
                                </div>

                                <div className='flex gap-4'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Password</span>
                                        </label>
                                        <input type="password"  {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/
                                        })} placeholder="password" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase, one number and one special character.</p>}
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Confirm Password</span>
                                        </label>
                                        <input type="password"  {...register("confirmPassword", {
                                            required: true,
                                            validate: (value) => value === password || 'Passwords do not match',
                                        })} placeholder="confirm password" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>

                                <div className='flex gap-4 w-full'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Photo URL</span>
                                        </label>
                                        {/* <input type="text"  {...register("photoURL", { required: true })} placeholder="url" className="input input-bordered border-gray-700 border shadow-sm" /> */}
                                        <input type="file" {...register("photoURL", { required: true })} className="file-input file-input-bordered file-input-secondary w-full " />
                                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Gender</span>
                                        </label>
                                        <input type="text"  {...register("gender", { required: true })} placeholder="gender" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.gender && <span className="text-red-600">Gender is required</span>}
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Phone number</span>
                                        </label>
                                        <input type="text"  {...register("phone", { required: true })} placeholder="phone number" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.phone && <span className="text-red-600">Phone number is required</span>}
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Address</span>
                                        </label>
                                        <input type="text"  {...register("address", { required: true })} placeholder="address" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.address && <span className="text-red-600">Address is required</span>}
                                    </div>
                                </div>
                                <label className="label">
                                    <a href="#" className="text-gray-400 link link-hover">Forgot password?</a>
                                </label>
                                <div className="form-control mt-6 relative">
                                    <input className="btn btn-primary text-white" type="submit" value={isLoading ? "Loading..." : "Sign up"} />
                                    {
                                        isLoading && <BeatLoader className='absolute top-2/4 -translate-y-2.5 right-20 ' color="#82faac" />
                                    }
                                </div>
                            </form>
                            <div className='card-body -mt-10 flex flex-col items-center'>
                                <p className="text-base mt-6 mb-3 text-gray-500 font-normal text-center">Connect With</p>
                                <GoogleLogin></GoogleLogin>
                                <div className='flex mt-10 justify-center'>
                                    <Link to='/login'>Already Have an account? <span className='text-red-600 font-bold'>log in</span></Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;