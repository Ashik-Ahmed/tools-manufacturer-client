import React from 'react';
import { useQuery } from 'react-query';
import ReviewCard from '../ReviewCard/ReviewCard';
import Loading from '../Shared/Loading';

const Reviews = () => {
    const { data: reviews, isLoading } = useQuery('reviews', () => fetch('https://immense-crag-05467.herokuapp.com/reviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='mt-8'>
            <div className='pb-2 border-secondary border-b-4'>
                <h2 className='text-2xl text-center font-bold'>Our valuable Consumers Feedback</h2>
            </div>

            <div className='md:grid grid-cols-4 mb-12'>
                {
                    reviews.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default Reviews;