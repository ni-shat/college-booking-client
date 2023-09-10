import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';


const ReviewsSection = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])


    return (
        <div className='mt-16'>
            <div>
                <p className='text-2xl font-semibold text-gray-800  w-fit  px-0 mx-20 uppercase pb-0 mb-0 rounded-sm'>Discover What Others Say</p>
                <div className="divider bg-lime-700 h-1 mx-20 w-20 mb-8 mt-2"></div>
            </div>

            <Swiper
                slidesPerView={3}
                // spaceBetween={30}
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            // height={300}
            >
                {
                    reviews?.map((review) => (
                        <div key={review._id} className=''>
                            <SwiperSlide className={`relative bg-gray-200 px-2.5 mb-2 py-5`}>
                                <div className='h-64 bg-white rounded-lg w-full px-10 py-6'>
                                    <div className='flex items-center justify-start  gap-3'>
                                        <div className='h-10 w-10 rounded-full bg-gray-600 text-white flex justify-center items-center'>{review.name.charAt(0)}</div>
                                        <div>{review.name}</div>
                                    </div>
                                    <div className='flex mt-5 gap-3 items-center'>
                                        <span className='text-5xl text-lime-600'>"</span>
                                        <div className='text-base text-start mt-0'>
                                            {review.comment}
                                        </div>
                                    </div>
                                    <div className='divider w-[90%] mx-auto'></div>
                                    <div className='flex items-center justify-start gap-3 ml-7 mt-5'>
                                        <div>
                                            <p className='font-semibold text-base'>{review.collegeName}</p>
                                        </div>
                                        <Rating
                                            className='flex mt-1 justify-start'
                                            initialRating={review.rating}
                                            readonly
                                            // onChange={(newRating) => setRating(newRating)}
                                            emptySymbol={<FaRegStar className="icon text-yellow-500" />}
                                            placeholderSymbol={<FaStar className="icon text-yellow-500" />}
                                            fullSymbol={<FaStar className="icon text-yellow-500" />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default ReviewsSection;