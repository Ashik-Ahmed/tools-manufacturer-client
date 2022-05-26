import React, { useState } from 'react';

const ReviewCard = (props) => {
    const { name, reviewText, rating } = props.review;


    // state for see More button 
    const [seeMore, setSeeMore] = useState(false);
    const handleSeeMore = () => {
        setSeeMore(!seeMore);
    }

    return (
        <div className='text-left bg-green-500 rounded-lg shadow-xl text-gray-100 mx-auto  md:mx-6 mt-4'>
            <div className='flex justify-between items-center gap-4 mb-2 p-3 border-b-4'>
                {/* <img className='w-8 h-8 rounded-full' src={img} alt="" /> */}
                <h4 className='font-semibold'>{name}</h4>
                <p className='font-bold'>Rating: {rating}</p>
                {/* <div class="rating">
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked={rating == 1} />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked={rating == 2} />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked={rating == 3} />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked={rating == 4} />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked={rating == 5} />
                </div> */}
            </div>
            <div className='px-4 pb-3'>


                {/* Showing blog details full/short on button click */}
                {
                    reviewText.length > 200 ? (
                        seeMore ? (<p className='italic  text-sm'>{reviewText}<button onClick={handleSeeMore} className='text-pink-700 font-bold'>...See Less</button></p>) : <p className='italic  text-sm'>{reviewText.slice(0, 200)}<button onClick={handleSeeMore} className='text-pink-700 font-bold'>...See More</button></p>
                    )
                        :
                        <p className='italic text-sm' >{reviewText}</p>
                }

                {/* <p>{description.slice(0, 200)}<button className='text-yellow-600'>...See More</button></p> */}
            </div>
        </div>
    );
};

export default ReviewCard;