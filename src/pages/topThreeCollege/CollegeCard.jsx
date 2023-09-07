import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {

    const { _id, name, location, admissionDates, rating, admissionProcess, events, researchHistory, sportsFacilities, image } = college;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img className='h-64 w-full object-cover' src={image} alt="college" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className='card-actions items-center'>
                    <div className='font-semibold'>Admission Date:</div>
                    <div className="badge badge-outline">{admissionDates[0]}</div>
                    <div className="badge badge-outline"> {admissionDates[1]}</div>
                </div>

                <div className='flex flex-wrap w-auto gap-1 justify-start items-center'>
                    <div className='mr-1 font-semibold'>Events:</div>
                    {
                        events.map((ev, index) => <div key={index}>{ev.name}
                            {
                                index !== (events.length) - 1 && ','
                            }
                        </div>)
                    }
                </div>

                <div className='flex flex-wrap w-auto gap-1 justify-start items-center'>
                    <div className='mr-1 font-semibold'>Research history:</div>
                    {
                        researchHistory.map((ev, index) => <div key={index}>{ev.title}
                            {
                                index !== (researchHistory.length) - 1 && ','
                            }
                        </div>)
                    }
                </div>

                <div className='flex flex-wrap w-auto gap-1 justify-start items-center'>
                    <div className='mr-1 font-semibold'>Sports:</div>
                    {
                        sportsFacilities.map((ev, index) => <div key={index}>{ev.name}
                            {
                                index !== (sportsFacilities.length) - 1 && ','
                            }
                        </div>)
                    }
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}>
                        <button className="btn btn-primary bg-lime-700 border-0 text-white hover:bg-opacity-50 hover:bg-lime-700">View Details <FaArrowRight /></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CollegeCard;