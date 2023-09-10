import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaUserCircle } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';

const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    const [myAdmissionInfo, setMyAdmissionInfo] = useState({});
    const [myCollegeInfo, setMyCollegeInfo] = useState({});

    useEffect(() => {
        if (user && user?.email) {
            fetch(`http://localhost:5000/my-admission-info?email=${user?.email}`)
                .then(res => res.json())
                .then(data => setMyAdmissionInfo(data));
        }
    }, [user])

    useEffect(() => {
        if (Object.keys(myAdmissionInfo).length !== 0) {
            console.log('im in keys if')
            fetch(`http://localhost:5000/college-details/${myAdmissionInfo?.collegeId}`)
                .then(res => res.json())
                .then(data => setMyCollegeInfo(data));
        }
    }, [myAdmissionInfo])

    if (loading) {
        return <PropagateLoader color="#DC2828" />
    }


    return (
        <div className='pt-32 flex justify-center px-40 h-screen'>
            <div className='w-2/4'>
                {/* <h4 className='text-2xl font-bold uppercase'>{myCollegeInfo.name}</h4> */}
                <h4 className='text-2xl font-bold uppercase border-b-2 w-fit border-lime-700 rounded-xl pb-1 px-12'>My Information</h4>

                <div className='text-base mt-7 space-y-4'>
                    <p className='flex gap-3 items-center'><span className='font-semibold capitalize'>name:</span> {myAdmissionInfo.name}</p>
                    <p className='flex gap-3 items-center'><span className='font-semibold capitalize'>email:</span> {myAdmissionInfo.email}</p>
                    <p className='flex gap-3 items-center'><span className='font-semibold capitalize'>address:</span> {myAdmissionInfo.location}</p>
                    <p className='flex gap-3 items-center'><span className='font-semibold capitalize'>phone:</span> {myAdmissionInfo.phone}</p>
                    <p className='flex gap-3 items-center'><span className='font-semibold capitalize'>College Name:</span> {myCollegeInfo.name}</p>
                    <p className='flex gap-3 items-center'><span className='font-semibold capitalize'>Subject:</span> {myAdmissionInfo.subject}</p>
                </div>
                <Link
                    to={`/admission-form/${myAdmissionInfo?.collegeId}`}
                    state={{ 
                        subject: myAdmissionInfo.subject,
                        location: myAdmissionInfo.location,
                        phone: myAdmissionInfo.phone,
                    }}
                    // to={{
                    //     pathname: `/admission-form/${myAdmissionInfo?.collegeId}`,
                    //     state: { someKey: 'someValue' } // Set your state here
                    // }}

                ><button className='text-base font-semibold w-fit flex items-center gap-3 bg-slate-100 px-4 py-1.5 mt-4 rounded-lg cursor-pointer hover:bg-opacity-60'>Edit <FaPencilAlt className='text-sm' /></button></Link>
            </div>
            <div>
                <div className="artboard artboard-horizontal phone-1 bg-gray-100 flex flex-col gap-3 justify-center items-center px-5 rounded-lg shadow-2xl">
                    <div>
                        {
                            user?.displayName ?
                                <>
                                    <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                        {
                                            user?.photoURL ? <img className='rounded-full w-14 h-14 object-cover' src={user?.photoURL} alt="" />
                                                : <FaUserCircle className='w-16 h-16 text-gray-500' />
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    {
                                        user?.photoURL ? <img className='rounded-full w-14 h-14 object-cover' src={user?.photoURL} alt="" />
                                            : <FaUserCircle className='w-16 h-16 text-gray-500' />
                                    }
                                </>
                        }
                    </div>
                    <div className='text-base font-semibold'>
                        <p><span className='font-semibold capitalize'></span> {myAdmissionInfo.name}</p>
                    </div>
                    <div className='text-base font-medium'>
                        <p><span className='font-semibold capitalize'></span> {myAdmissionInfo.email}</p>
                    </div>
                    <div className='text-base font-medium'>
                        <p><span className='font-semibold capitalize'></span> {myAdmissionInfo.location}</p>
                    </div>
                    <div className='divider px-10 -mt-0'></div>
                    <div className='text-base font-medium'>
                        <p><span className='font-semibold capitalize'>Contact:</span> {myAdmissionInfo.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;