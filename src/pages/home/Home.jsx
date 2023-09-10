import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from './Banner';
import TopThreeCollege from '../topThreeCollege/TopThreeCollege';
import GraduatesGallery from './GraduatesGallery';
import ResearchSection from './ResearchSection';
import ReviewsSection from './ReviewsSection';

const Home = () => {
    return (
        <div className='bg-white mt-10 pb-14'>
            <Helmet>
                <title>Academia | Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            
            <Banner></Banner>
            <div className='h-screen text-transparent'>
                no text
            </div>
            <TopThreeCollege></TopThreeCollege>
            <GraduatesGallery></GraduatesGallery>
            <ResearchSection></ResearchSection>
            <ReviewsSection></ReviewsSection>
        </div>
    );
};

export default Home;