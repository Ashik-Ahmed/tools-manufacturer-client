import React from 'react';
import contact from '../../Assets/images/contact.jpg';
import { ImLocation2 } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Contact = () => {
    return (
        <div className='h-fit'>
            <div className="hero md:mb-20 bg-blue-200" style={{ "background-image": `url(${contact})`, 'background-size': '50%', 'background-repeat': 'no-repeat', 'background-position': 'right 0% bottom 45%' }}>

                <div className='flex justify-start  w-full'>
                    <div className='card pb-4 '>
                        <div>
                            <h2 className='text-5xl mb-8 font-extrabold text-primary'>Contact Us</h2>
                            <div className='flex items-center'>
                                <div className='w-1/3 text-left pl-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='text-3xl'>
                                            <ImLocation2 />
                                        </div>
                                        <p>Zakir Hossain Road, Lalmatia, Mohammadpur, Dhaka-1207</p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-4'>
                                        <div className='text-3xl'>
                                            <MdEmail />
                                        </div>
                                        <p>ashikahmed121@gmail.com</p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-4'>
                                        <div className='text-3xl'>
                                            <BsFillTelephoneFill />
                                        </div>
                                        <p>+8801521464568</p>
                                    </div>
                                </div>
                                <div className='w-2/3'>
                                    <div className='card-body grid grid-cols-1 gap-4'>
                                        <input type="text" placeholder="Email" class="input input-bordered w-full " />
                                        <input type="text" placeholder="Subject" class="input input-bordered w-full " />
                                        <textarea class="textarea input-bordered" placeholder="Message"></textarea>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;