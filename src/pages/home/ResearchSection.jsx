import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const ResearchSection = () => {

    const [researches, setResearches] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reccomended-research')
            .then(res => res.json())
            .then(data => setResearches(data));
    }, [])

    return (
        <div className='relative w-full'>
            <div className='bg-gray-100 h-[580px] w-[60%] mt-20 mx-20'>
                <div className='text-3xl h-full px-10 flex flex-col justify-center'>
                    <p>Reccomended Research Collections</p>
                    <div className="divider bg-lime-700 h-1 mx-0 w-20 mb-0 mt-2"></div>
                    <p className='text-base mt-3.5 w-[55%]'>Dive into the world of innovation, where curiosity drives research, and breakthroughs shape the future!</p>
                </div>
            </div>

            <div className='absolute top-2/4 transform -translate-y-2/4 px-20 right-0 w-[60%]'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                // height={300}
                >
                    {
                        researches?.map((research) => (
                            <SwiperSlide key={research._id} className={`relative border border-transparent`}>

                                <div className="w-full h-[450px] relative bg-gradient-to-b from-lime-400 to-black mix-blend-multiply">

                                    <div className='text-white  w-full px-10 leading-relaxed absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-12'>
                                        <h5 className='uppercase font-semibold text-3xl'>{research.title}</h5>
                                        <p className='mt-4'>
                                            <p>by</p>
                                            <p>{research.author}</p>
                                        </p>
                                    </div>
                                </div>



                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

        </div>
    );
};

export default ResearchSection;