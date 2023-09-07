import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollegeDetailsCard from "./CollegeDetailsCard";


const CollegeDetails = () => {
    const [CollegeDetails, setCollegeDetails] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/college-details/${id}`)
            .then(res => res.json())
            .then(data => setCollegeDetails(data));
    }, [id])

    const { name, location, admissionDates, rating, admissionProcess, events, researchHistory, sportsFacilities, image } = CollegeDetails;


    return (
        <div className="2xl:px-20 mt-20 ">
            <div className="relative w-fit mx-auto">
                <img className="2xl:h-[500px] 2xl:w-[950px] w-[100%] md:w-[90%] mx-auto object-cover" src={image} alt="" />
                <div className="absolute 2xl:w-[940px] w-[95%] md:w-[86%] left-2/4 transform -translate-x-2/4 bottom-0  bg-black blur-xl opacity-75 h-20">
                </div>
                <p className="2xl:text-4xl xl:text-3xl sm:text-xl absolute 2xl:bottom-5 bottom-5 left-5 md:bottom-11 2xl:left-5 md:left-24 font-semibold text-white ">{name}</p>
            </div>
            <div className="2xl:mt-20 mt-14 2xl:px-20 px-4 md:px-10">
                <p className="text-xl font-semibold uppercase 2xl:mb-7 mb-3 md:mb-6 sm:mb-4">Admission Process</p>
                <ul className="list-disc list-outside px-5">
                    {
                        admissionProcess?.map((process, index) => (
                            <li key={index}>{process}</li>
                        ))
                    }
                </ul>
            </div>

            <div className="2xl:mt-16 mt-14 2xl:px-20 px-4 md:px-10">
                <p className="text-xl font-semibold uppercase 2xl:mb-7 mb-3 md:mb-6 sm:mb-4">Events</p>
                <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 2xl:gap-4 justify-center">
                    {
                        events?.map((event_, index) => (
                            <CollegeDetailsCard key={index} event_={event_}></CollegeDetailsCard>
                        ))
                    }
                </div>
            </div>

            <div className="2xl:mt-16 mt-14 2xl:px-20 px-4 md:px-10">
                <p className="text-xl font-semibold uppercase 2xl:mb-7 mb-3 md:mb-6 sm:mb-4">research history</p>
                <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 2xl:gap-4 justify-center mb-20">
                    {
                        researchHistory?.map((research, index) => (
                            <div key={index}>
                                <div className="card 2xl:w-96 w-[100%] rounded-none bg-base-100 shadow-xl">
                                    <div className='relative bg-gray-800 h-20 flex justify-center items-center '>

                                        <div className="  text-white capitalize text-xl font-medium px-5 py-2">
                                            {/* {research.title} */}
                                        </div>

                                        <div className='absolute -bottom-5 bg-lime-600 capitalize text-xl text-white font-medium px-5 py-2'>
                                            <p>{research.title}</p>
                                            <div className="text-sm font-normal mt-2.5">Publication Date: {research.publicationDate}</div>
                                        </div>

                                    </div>
                                    <div className="mt-10 px-5 mb-6 flex flex-row justify-end items-center gap-1.5"> <p className="text-gray-500">By</p>
                                        <p className="font-semibold ">{research.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className="2xl:mt-16 mt-14 2xl:px-20 px-4 md:px-10">
                <p className="text-xl font-semibold uppercase 2xl:mb-7 mb-3 md:mb-6 sm:mb-4">Sports</p>
                <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 2xl:gap-4 justify-center mb-20">
                    {
                        sportsFacilities?.map((sport, index) => (
                            // <div>
                            <div key={index} className="card 2xl:w-96 w-[100%] rounded-none bg-base-100 shadow-xl">
                                <div className='relative'>
                                    <figure>
                                        <img src={sport.image} className='h-60 w-full object-cover' alt="Event" />
                                    </figure>
                                    <div className="h-60 w-full absolute bottom-0 left-0">
                                        <div className="h-full w-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                                        <h2 className="card-title absolute bottom-4 left-4 text-white">{sport.name}</h2>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>{sport.description}</p>
                                </div>
                            </div>
                            // </div>
                        ))
                    }
                </div>
            </div>


        </div>
    );
};

export default CollegeDetails;