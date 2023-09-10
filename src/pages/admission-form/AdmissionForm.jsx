import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;


const AdmissionForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let { id } = useParams();
    console.log("nishat")
    const Location = useLocation();
    console.log(Location.state)

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

                    const saveUser = {
                        name: data.name,
                        email: user?.email,
                        subject: data.subject,
                        birthdate: data.birthdate,
                        gender: data.gender,
                        userImage: imgURL,
                        location: data.address,
                        phone: data.phone,
                        collegeId: id
                    }
                    // console.log(saveUser)

                    // after successfully updating start axios fetch
                    fetch(`http://localhost:5000/applied-admission?email=${user?.email}`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(saveUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId || data.modifiedCount) {
                                reset();
                                setIsLoading(false);
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Applied successfully!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                            else if (data.matchedCount) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'info',
                                    title: 'Please change the information to update!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })


                }
            })

    };


    return (
        <div className='bg-white pt-24 h-screen bg-cover bg-center'>
            <Helmet>
                <title>Academia | Admission Form</title>
            </Helmet>

            <h3 className=' text-gray-800  whitespace-nowrap text-center text-2xl mb-8 mx-auto border-lime-700 rounded-lg px-4 pb-1 border-b-2 w-fit '>Admission Form</h3>

            <div className=" pb-0 bg-white">
                <div className="flex w-[80%] mx-auto items-center justify-center ">
                    <div className='w-[65%]'>
                        <div className="card w-full pb-5  flex-shrink-0 shadow-2xl bg-base-100  ">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                {/*  */}

                                {/*  */}
                                <div className='flex gap-4'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Candidate Name</span>
                                        </label>
                                        <input type="text" defaultValue={user?.displayName}  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered border-gray-700 border shadow-sm" />
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Candidate Email</span>
                                        </label>
                                        <input type="email" disabled={true} defaultValue={user?.email}  name="email" placeholder="email" className="input input-bordered border-gray-700 border shadow-sm" />
                                    </div>
                                </div>

                                <div className='flex gap-4'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Subject</span>
                                        </label>
                                        <input type="text" defaultValue={Location?.state ? Location?.state.subject : ""}  {...register("subject", { required: true })} name="subject" placeholder="subject" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.subject && <span className="text-red-600">Subject is required</span>}
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Date of birth</span>
                                        </label>
                                        <input type="text"  {...register("birthdate", { required: true })} name="birthdate" placeholder="birthdate" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.birthdate && <span className="text-red-600">birthdate is required</span>}
                                    </div>
                                </div>

                                <div className='flex gap-4 w-full'>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Photo URL</span>
                                        </label>
                                        <input type="file" {...register("photoURL", { required: true })} className="file-input file-input-bordered border border-gray-800 w-full " />
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
                                        <input type="text" defaultValue={Location?.state ? Location?.state.phone : ""} {...register("phone", { required: true })} placeholder="phone number" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.phone && <span className="text-red-600">Phone number is required</span>}
                                    </div>
                                    <div className="form-control w-2/4">
                                        <label className="label">
                                            <span className="text-gray-800">Address</span>
                                        </label>
                                        <input type="text" defaultValue={Location?.state ? Location?.state.location : ""} {...register("address", { required: true })} placeholder="address" className="input input-bordered border-gray-700 border shadow-sm" />
                                        {errors.address && <span className="text-red-600">Address is required</span>}
                                    </div>
                                </div>


                                {/* <div className="form-control mt-6 relative">
                                    <input className="btn bg-lime-700 text-white" type="submit" value={isLoading ? "Loading..." : "Admit"} />
                                </div> */}
                                <div className="form-control mt-6">
                                    <button className="btn bg-lime-700 text-white">
                                        {
                                            Location?.state ? 'Update' : 'Admit'
                                        }
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdmissionForm;