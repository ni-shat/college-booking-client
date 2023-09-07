import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from './Banner';
import TopThreeCollege from '../topThreeCollege/TopThreeCollege';

const Home = () => {
    return (
        <div className='bg-blue-200 mt-10'>
            <Helmet>
                <title>Academia | Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            
            <Banner></Banner>
            <TopThreeCollege></TopThreeCollege>
            
        </div>
    );
};

export default Home;