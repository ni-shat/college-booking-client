import React, { useEffect, useState } from 'react';

const GraduatesGallery = () => {

    const [gallerPics, setGalleryPics] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/graduate-group-pictures`)
            .then(res => res.json())
            .then(data => setGalleryPics(data))
    }, [])

    return (
        <div>
            <div className='bg-black bg-opacity-10 h-[120px] flex items-center -mt-2'>
                <div>
                    <h4 className='text-2xl text-gray-800 px-20 mt-2 uppercase font-bold'>Graduation Gallery</h4>
                    <div className="divider bg-lime-600 h-1 w-20 mx-20 mt-2"></div>
                    <p className='text-gray-800 px-20 -mt-2 mb-2'>Step into our graduation gallery and witness the joy, pride, and camaraderie that define our graduating class.</p>
                </div>
            </div>
            <div className='grid grid-cols-4 px-0'>
                {
                    gallerPics?.map((pic) =>
                        <div key={pic._id} className='relative'>
                            <img className='h-52 w-full object-cover' src={pic.graduatesGroupPictures} alt="" />
                            {/* <div className="h-52 w-full absolute bottom-0 left-0">
                                <div className="h-full w-full bg-gradient-to-b from-transparent to-lime-700 opacity-50"></div>
                                <h2 className="card-title font-normal absolute bottom-5 right-5 text-white">{pic.name}</h2>
                            </div> */}
                        </div>
                    )
                }
                {
                    gallerPics?.map((pic) =>
                        <div key={pic._id} className='relative'>
                            <img className='h-52 w-full object-cover' src={pic.graduatesGroupPictures} alt="" />
                            {/* <div className="h-52 w-full absolute bottom-0 left-0">
                                <div className="h-full w-full bg-gradient-to-b from-transparent to-lime-700 opacity-50"></div>
                                <h2 className="card-title font-normal absolute bottom-5 right-5 text-white">{pic.name}</h2>
                            </div> */}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default GraduatesGallery;