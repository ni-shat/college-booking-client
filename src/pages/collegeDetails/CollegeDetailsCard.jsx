import React from 'react';

const CollegeDetailsCard = ({ event_ }) => {

    const { name, date, description, image } = event_;

    return (
        <div className="card 2xl:w-96 w-[100%] rounded-none bg-base-100 shadow-xl">
            <div className='relative'>
                <figure><img src={image} className='rounded-' alt="Event" /></figure>
                <div className='absolute -bottom-5 bg-lime-600 text-white font-medium px-5 py-2'>
                    <div>{date}</div>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title mt-1">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CollegeDetailsCard;