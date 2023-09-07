import bg from '../../assets/fullscreen-slider.jpg';
import { BsSearch } from "react-icons/bs";

const Banner = () => {
    return (
        <div className='absolute top-0 w-full z-10 text-gray-800 '>
            <img className='h-screen object-cover w-full opacity-80' src={bg} alt="" />

            <div className=' h-auto  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex items-center'>
                    <input type="text" placeholder='Search College' className="px-4 h-14 rounded-l-lg w-[500px] file-input-bordered " />
                    <button className='h-14 z-0 bg-lime-700 w-16 rounded-r-lg text-white flex justify-center items-center'><BsSearch /> </button>
                </div>
            </div>
            <div className='h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 text-xl font-normal space-y-2'>
                <p className='font-bold text-xl text-center uppercase'>Your Gateway to College Services</p>
                <p>Discover, Reserve, and Experience College Services Like Never Before</p>
            </div>

        </div>
    );
};

export default Banner;