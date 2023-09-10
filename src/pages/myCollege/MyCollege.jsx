import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { PropagateLoader } from "react-spinners";
import CollegeDetails from '../collegeDetails/CollegeDetails';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyCollege = () => {

    const { user, loading } = useContext(AuthContext);
    const [myAdmissionInfo, setMyAdmissionInfo] = useState({});
    const [myCollegeInfo, setMyCollegeInfo] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [reviewText, setReviewText] = useState(''); // State for review text
    const [rating, setRating] = useState(4.5); // State for rating
    // if (loading) {
    //     return <PropagateLoader color="#DC2828" />
    // } 

    console.log(myAdmissionInfo)


    useEffect(() => {
        if (user && user.email) {
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
    

    const addReviewHandle = () => {
        const saveReview = {
            userEmail: user?.email,
            name: user?.displayName,
            collegeName: myCollegeInfo.name,
            rating: rating,
            comment: reviewText
        }

        if (rating && reviewText) {
            fetch(`http://localhost:5000/add-review`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveReview)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {

                        // setOpenModal(true);
                        notify();
                    }
                })
        }
    }

    const notify = () => toast("Feedback added!");


    return (
        <div className='pt-32 pb-20'>

            <div className='flex w-full justify-between px-20'>
                <div className='w-2/4'>
                    {
                        // Object.keys(myAdmissionInfo).map((key) => (
                        //     <div key={key}>
                        //         {/* myCollegeInfo[key] is each object */}
                        //         {/* {myAdmissionInfo[key]} */}

                        //     </div>
                        // ))
                    }
                    {/* <h4 className='text-2xl font-bold uppercase'>{myCollegeInfo.name}</h4> */}
                    <h4 className='text-2xl font-bold uppercase border-b-2 w-fit border-lime-700 rounded-xl pb-1 px-12'>My Information</h4>

                    <div className='text-base mt-7 space-y-4'>
                        <p><span className='font-semibold capitalize'>name:</span> {myAdmissionInfo.name}</p>
                        <p><span className='font-semibold capitalize'>email:</span> {myAdmissionInfo.email}</p>
                        <p><span className='font-semibold capitalize'>address:</span> {myAdmissionInfo.location}</p>
                        <p><span className='font-semibold capitalize'>phone:</span> {myAdmissionInfo.phone}</p>
                    </div>
                </div>

                <div className='w-2/4'>

                    <div>
                        {/* <button >Notify!</button> */}
                        <ToastContainer />
                    </div>

                    <h4 className='text-2xl font-bold uppercase border-b-2 w-fit border-lime-700 rounded-xl pb-1 px-12'>Share Your Experience</h4>

                    <div className='text-base flex-col mt-7 space-y-4 rounded-xl bg-lime-200 h-full flex justify-center items-center'>
                        <p className='text-xl my-0 font-medium '>Tell Us What You Think!</p>
                        <button
                            onClick={
                                () => {
                                    document.getElementById('my_modal_1').showModal();
                                }
                            }
                            className='text-2xl btn font-bold uppercase border-2 w-fit  rounded-full shadow-2xl bg-white py-2 px-8 hover:bg-opacity-50'>Add review</button>

                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg text-lime-700">Leave a review!</h3>
                                <div>
                                    <form action="">
                                        <textarea
                                            onChange={(e) => setReviewText(e.target.value)}
                                            name="" id="" rows="6"
                                            value={reviewText}
                                            className='w-full my-3 p-4 border-2 rounded-xl border-lime-700'></textarea>
                                        <div className='flex gap-2 items-center'>
                                            <p>Rate that colllege:</p>
                                            <Rating
                                                className='mt-1'
                                                initialRating={rating}
                                                onChange={(newRating) => setRating(newRating)}
                                                emptySymbol={<FaRegStar className="icon text-yellow-500" />}
                                                placeholderSymbol={<FaStar className="icon text-yellow-500" />}
                                                fullSymbol={<FaStar className="icon text-yellow-500" />}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className='flex gap-2.5 items-center justify-center'>
                                    <div className="modal-action flex justify-center mt-5 ">
                                        <form method="dialog" className=''>
                                            <button className="btn px-4 btn-sm border-2 rounded-xl border-gray-700 w-32 bg-gray-300">Cancel</button>
                                        </form>
                                    </div>
                                    <div className="modal-action flex justify-center mt-5 ">
                                        <form method="dialog" className=''>
                                            <button onClick={addReviewHandle} className="btn px-4 btn-sm border-2 rounded-xl border-lime-700 w-32 bg-lime-300">Add</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </dialog>


                        {/*  */}
                    </div>
                </div>

            </div>
            <div className='mt-14 '>
                <h4 className='text-2xl mx-20 -mb-8 font-bold uppercase border-b-2 border-lime-700 rounded-xl w-fit pb-1 px-12'>My College details</h4>
                <CollegeDetails></CollegeDetails>
            </div>
        </div>
    );
};

export default MyCollege;