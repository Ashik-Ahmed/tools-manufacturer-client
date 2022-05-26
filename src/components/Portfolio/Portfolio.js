import React from 'react';
import myPhoto from '../../Assets/images/portfolio-pic.png';
import myPhoto2 from '../../Assets/images/mypic-2.png';
import JS from '../../Assets/images/js.png'
import html from '../../Assets/images/html.png'
import css from '../../Assets/images/css.png'
import es6 from '../../Assets/images/es6.jpg'
import node from '../../Assets/images/node.png'
import mongo from '../../Assets/images/mongo.png'
import photography from '../../Assets/images/photography.jpg'
import warehouse from '../../Assets/images/warehouse.jpg'
import review from '../../Assets/images/review.jpg'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'


const Portfolio = () => {
    return (
        <div className=''>
            <div class="card lg:card-side bg-base-100 md:flex justify-around md:mx-16 ">

                <div class="my-auto">
                    <div className='text-5xl font-extrabold'>
                        <h2 className=''>Hi! I Am</h2>
                        <h2 className='text-primary'>Ashik Ahmed</h2>
                    </div>
                    <p className='text-lg italic md:mt-6'>-Professional Intermediate level Web Developer.</p>
                    <div>
                        <button class="btn btn-primary rounded-3xl px-6 shadow-xl md:mt-12">Hire Me</button>
                    </div>

                </div>
                <div className='hidden md:block'>
                    <figure>
                        <img className='md:w-1/2' src={myPhoto} alt="Album" />
                    </figure>
                </div>
            </div>

            <div class="card lg:card-side bg-base-100 md:flex justify-center mt-12 md:mx-16 ">

                <figure>
                    <img className='bg-pink-400 justify-end rounded-2xl' src={myPhoto2} alt="Album" />
                </figure>
                <div class="my-auto md:w-1/2 md:ml-16">
                    <h3 className='text-left border-b-4 font-semibold text-secondary'>About Me</h3>
                    <div className='text-3xl text-left font-extrabold'>
                        <h2 className=''>Why Hire Me for your</h2>
                        <h2 className='text-primary'>Office/Next Project</h2>
                    </div>
                    <p className='text-lg italic md:mt-6'>I am a passionate Programmer. I truly value my tasks and do my best level to complete within given time. You can see my career summary below. Currently, I am working on a full time project and also looking for a part-time job.</p>

                    <div className='md:flex md:justify-center grid grid-cols-1 gap-4 md:mt-6'>
                        <div class="stats shadow-xl bg-gray-200 border-b-2 border-l-2 border-green-600">

                            <div class="stat">
                                <div class="stat-value text-green-600">100+</div>
                                <div class="stat-desc font-bold">Happy Clients</div>
                            </div>

                        </div>
                        <div class="stats shadow-xl bg-yellow-200 border-t-2 border-l-2 border-secondary">

                            <div class="stat">
                                <div class="stat-value text-secondary">250+</div>
                                <div class="stat-desc font-bold">Project Completed</div>
                            </div>

                        </div>
                        <div class="stats shadow-xl bg-pink-200 border-t-2 border-r-2 border-blue-600">

                            <div class="stat">
                                <div class="stat-value text-blue-600">100+</div>
                                <div class="stat-desc font-bold">Reviews</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div className='md:mx-16 md:mt-12 mt-5'>
                <h3 className='text-left border-b-4 text-2xl font-extrabold text-secondary'>My Expertise Areas</h3>

                <div className='md:grid grid-cols-3  gap-4 md:mt-4'>
                    <div className='rounded-lg text-center mx-auto shadow-xl bg-white'>
                        <h2 class="card-title py-2 bg-red-400 rounded-t-lg px-1">HTML5: Advanced</h2>
                        <div class="card md:w-48 mx-auto px-3">
                            <figure><img className='' src={html} alt="Shoes" /></figure>

                        </div>

                    </div>
                    <div className='rounded-lg text-center mx-auto shadow-xl bg-white'>
                        <h2 class="card-title py-2 bg-red-400 rounded-t-lg px-1">CSS3: Advanced</h2>
                        <div class="card md:w-48 mx-auto">
                            <figure><img className='' src={css} alt="Shoes" /></figure>

                        </div>
                    </div>
                    <div className='rounded-lg text-center mx-auto shadow-xl bg-white'>
                        <h2 class="card-title py-2 bg-red-400 rounded-t-lg px-1">JavaScript: Intermediate</h2>
                        <div class="card md:w-48 mx-auto">
                            <figure><img className='' src={JS} alt="Shoes" /></figure>

                        </div>
                    </div>
                    <div className='rounded-lg text-center mx-auto shadow-xl bg-white'>
                        <h2 class="card-title py-2 bg-red-400 rounded-t-lg px-1">ES6: Advanced</h2>
                        <div class="card md:w-48 mx-auto">
                            <figure><img className='' src={es6} alt="Shoes" /></figure>

                        </div>
                    </div>
                    <div className='rounded-lg text-center mx-auto shadow-xl bg-white'>
                        <h2 class="card-title py-2 bg-red-400 rounded-t-lg px-1">NodeJs: Basic</h2>
                        <div class="card md:w-48 mx-auto">
                            <figure><img className='' src={node} alt="Shoes" /></figure>
                        </div>
                    </div>
                    <div className='rounded-lg text-center mx-auto shadow-xl bg-white'>
                        <h2 class="card-title py-2 bg-red-400 rounded-t-lg px-1">MongoDB: Advanced</h2>
                        <div class="card md:w-40 mx-auto">
                            <figure><img className='' src={mongo} alt="Shoes" /></figure>

                        </div>
                    </div>
                </div>
            </div>


            <div className='md:mx-16 md:mt-12 mt-5'>
                <h3 className='text-left border-b-4  text-2xl font-extrabold text-secondary'>Education</h3>

                <div className='md:mt-4'>
                    <div className='md:flex gap-4'>
                        <div class="stats md:w-1/2 w-full shadow-xl bg-green-200 border-l-8 border-blue-600">

                            <div class="stat text-left">
                                <div className='font-bold text-secondary text-xl'>B.Sc.</div>
                                <div className='md:flex justify-between'>
                                    <div className='font-bold text-pink-400'>Daffodil International University</div>
                                    <div className='flex items-center gap-2 text-primary'><BsFillCalendarDateFill />2015-2019</div>
                                </div>
                                <div className='font-bold text-xl'>Computer Science & Engineering</div>
                                <div class="text-sm">CGPA: 3.46</div>
                            </div>

                        </div>
                        <div class="stats md:w-1/2  w-full shadow-xl bg-green-200 border-l-8 border-blue-600">

                            <div class="stat text-left">
                                <div className='font-bold text-secondary text-xl'>H.S.C</div>
                                <div className='md:flex justify-between'>
                                    <div className='font-bold text-pink-400'>Cantonment Public School & College, Rangpur</div>
                                    <div className='flex items-center gap-2 text-primary'><BsFillCalendarDateFill />2010-2012</div>
                                </div>
                                <div className='font-bold text-xl'>Group: Science</div>
                                <div class="text-sm">GPA: 5.00</div>
                            </div>

                        </div>
                    </div>

                    <div className='md:flex gap-4 mt-6'>
                        <div class="stats md:w-1/2 w-full shadow-xl bg-green-200 border-l-8 border-blue-600">

                            <div class="stat text-left">
                                <div className='font-bold text-secondary text-xl'>S.S.C</div>
                                <div className='md:flex justify-between'>
                                    <div className='font-bold text-pink-400'>Mirzapur High School</div>
                                    <div className='flex items-center gap-2 text-primary'><BsFillCalendarDateFill />2009-2010</div>
                                </div>
                                <div className='font-bold text-xl'>Group: Science</div>
                                <div class="text-sm">GPA: 5.00</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className='md:mx-16 md:mt-12 mt-5'>

                <h3 className='text-left text-2xl font-extrabold border-b-4 text-secondary'>My Best Projects</h3>

                <div className='md:flex gap-10'>
                    <div className='md:flex gap-4 mt-6 md:w-1/3'>
                        <a href="https://assignment-firebase-auth.web.app/" target='_blank'>
                            <div class="stats shadow-xl bg-yellow-200">

                                <div class="stat text-left">
                                    <figure>
                                        <img className='md:w-1/2 mx-auto' src={photography} alt="" />
                                    </figure>
                                    <div className='font-bold text-secondary text-xl'>Photography Website</div>

                                    <div className='font-bold text-xl'>Tech: React, Firebase, Tailwind</div>
                                </div>

                            </div>
                        </a>
                    </div>

                    <div className='md:flex gap-4 mt-6 md:w-1/3'>
                        <a href="https://assignment-mongodb-jwt.web.app/" target='_blank'>
                            <div class="stats shadow-xl  bg-green-200">

                                <div class="stat text-left">
                                    <figure>
                                        <img className='md:w-1/2 mx-auto' src={warehouse} alt="" />
                                    </figure>
                                    <div className='font-bold text-secondary text-xl md:mt-4'>Warehouse Maintenance Website</div>

                                    <div className='font-bold text-xl'>Tech: MongoDB, React, Firebase, Tailwind</div>
                                </div>

                            </div>
                        </a>
                    </div>

                    <div className='md:flex gap-4 mt-6 md:w-1/3'>
                        <a href="https://honest-review.netlify.app/" target='_blank'>
                            <div class="stats shadow-xl bg-red-200">

                                <div class="stat text-left">
                                    <figure>
                                        <img className='md:w-1/2 m-auto' src={review} alt="" />
                                    </figure>
                                    <div className='font-bold text-secondary text-xl md:mt-20'>Product Review Website</div>
                                    <div className='font-bold text-xl'>Tech: HTML5, CSS3, React, Tailwind, REST API</div>
                                </div>

                            </div>
                        </a>
                    </div>
                </div>
            </div>


            <div className='md:mt-16 bg-yellow-300 py-4'>
                <h2 className='text-3xl font-extrabold'>Contact Me</h2>
                <div className='mt-6'>
                    <h3>Ashik Ahmed</h3>
                    <p>Email: <span className='font-mono'>ashikahmed121@gmail.com</span></p>
                    <p>Contact: 01521464568</p>


                    <div class="mt-5">
                        <div class="flex items-center justify-center">
                            <input type="text" placeholder="Your Comment" class="input input-bordered" />
                            <button class="btn btn-square text-3xl">
                                <FiSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Portfolio;