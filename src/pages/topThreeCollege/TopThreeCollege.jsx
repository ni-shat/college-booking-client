import React, { useEffect, useState } from 'react';
import CollegeCard from './CollegeCard';

const TopThreeCollege = () => {

    const [allCollege, setAllCollege] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-colleges')
            .then(res => res.json())
            .then(data => setAllCollege(data));
    }, [])

    return (
        <div className='bg-white'>
            <div className='h-screen text-transparent'>
                no text
            </div>
            <p className='text-2xl font-semibold text-gray-800  w-fit  px-0 mx-20 uppercase pb-0 mb-0 rounded-sm'>Featured Colleges</p>
            <div className="divider bg-lime-700 h-1 mx-20 w-20 mb-8 mt-2"></div>
            <div className='grid grid-cols-3 px-20 mb-20 '>
                {
                    allCollege.map((college, index) => <CollegeCard key={index} college={college}></CollegeCard>)
                }
            </div>
        </div>
    );
};

export default TopThreeCollege;