import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import userVector from '../../Assets/images/user.png'
import { async } from '@firebase/util';

const MyProfile = () => {

    const [loggedinUser, setLoggedinUser] = useState([]);

    const [user] = useAuthState(auth);
    const userPhoto = user.photoURL || userVector;


    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedinUser(data)
            })
    }, [user, loggedinUser])

    const handleProfileUpdate = async (event) => {
        event.preventDefault();
        const education = event.target.education.value || loggedinUser.education;
        const address = event.target.address.value || loggedinUser.address;
        const contact = event.target.contact.value || loggedinUser.contact;
        const linkedin = event.target.linkedin.value || loggedinUser.linkedin;
        console.log("Update clicked", education, address, contact, linkedin);
        // await updateProfile({ education, address, contact, linkedin });

        const updatedUser = {
            education,
            address,
            contact,
            linkedin
        }

        if (user.email) {
            fetch(`http://localhost:5000/user/${user.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            })
                .then(res => res.json())
                .then(data => {
                    alert('Profile Updated');
                    event.target.reset();
                })
        }



    }

    return (
        <div class="card md:w-3/4 mx-auto mt-5 h-fit bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src={userPhoto} alt="Shoes" class="rounded-xl" />
            </figure>
            <form onSubmit={handleProfileUpdate}>
                <div class="card-body my-0 gap-y-0 items-center text-center">
                    <h2 class="card-title">Update Your Profile</h2>
                    <h3>Name: {user.displayName}</h3>
                    <h3>Email: {user.email}</h3>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Add your education</span>
                        </label>
                        <input type="text" name='education' placeholder={loggedinUser?.education || 'No education added'} class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Your Address</span>
                        </label>
                        <input type="text" name='address' placeholder={loggedinUser?.address || 'No address added'} class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Contact Number</span>
                        </label>
                        <input type="text" name='contact' placeholder={loggedinUser?.contact || 'No contact number'} class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Linkedin Profile</span>
                        </label>
                        <input type="text" name='linkedin' placeholder={loggedinUser?.linkedin || 'No Linked profile available'} class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="card-actions mt-5">
                        <button type='submit' class="btn btn-primary">Update</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default MyProfile;