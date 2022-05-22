import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const AddReview = () => {

    const [user, loading] = useAuthState(auth);

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        const rating = parseInt(event.target.rating.value) || 5;
        const reviewText = event.target.reviews.value;
        const review = {
            name: user?.displayName || 'Anonymous',
            rating,
            reviewText,
        }

        fetch('http://localhost:5000/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => console.log(data))
        event.target.reset();

    }

    return (
        <div>
            <h2>Please give us a rating and share your experience with us.</h2>
            <div className='w-3/4 mx-auto mt-8'>
                <form onSubmit={handleReviewSubmit}>
                    <div class="rating">
                        <input type="radio" name="rating" value='1' class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" value='2' class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" value='3' class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" value='4' class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" value='5' class="mask mask-star-2 bg-orange-400" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Your Comment</span>
                        </label>
                        <textarea name='reviews' class="textarea textarea-bordered h-24" placeholder="Comments"></textarea>
                    </div>
                    <br />
                    <input type="submit" value="Submit" className='btn btn-primary' />
                </form>
            </div>
            {/* <label for="my-modal-6" class="btn modal-button">open modal</label> */}
            {/* // <!-- Put this part before </body> tag-- >  */}
            {/* <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-5xl text-orange-500">Thank you!</h3>
                    <p class="py-4">Your review has been submitted successfully.</p>
                    <div class="modal-action">
                        <label for="my-modal-6" class="btn">Close</label>
                    </div>
                </div>
            </div> */}
        </div >
    );
};

export default AddReview;