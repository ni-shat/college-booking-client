import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admission = () => {
    const [allCollege, setAllCollege] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-colleges')
            .then(res => res.json())
            .then(data => setAllCollege(data));
    }, [])

    return (
        <div>
            <div className="overflow-x-auto mx-auto w-[85%] mt-32">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>College Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    {
                        allCollege.map((college, index) =>
                            <tbody key={index}>
                                <tr>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask w-20 h-20">
                                                    <img src={college.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{college.name}</div>

                                        </div>
                                    </td>
                                    <td><div className="text-sm opacity-50">{college.location}</div></td>
                                    <th>
                                        <div className='flex gap-4 -mr-20  items-center'>
                                           <Link to={`/admission-form/${college._id}`}><button className="btn btn-md px-10  bg-lime-700 text-white">Admit</button></Link>
                                           <Link to={`/details/${college._id}`}><button className='font-normal text-gray-500 border btn-sm rounded-xl h-full text-base'>View details</button></Link>
                                        </div>
                                    </th>

                                </tr>
                            </tbody>
                        )
                    }

                </table>
            </div>
        </div>
    );
};

export default Admission;