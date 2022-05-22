import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();
    return (
        <section className='flex justify-center items-center h-screen mx-auto max-w-7xl'>
            <div className='grid items-center w-full grid-cols-1 gap-10 mx-auto md:w-4/5 lg:grid-cols-2 xl:gap-32'>
                <div>
                    <p className='mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                        Error 404
                    </p>
                    <h1 className='mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-gray-900 md:text-4xl'>
                        Oops! Page is broken...
                    </h1>
                    <p className='mb-5 text-base text-left text-gray-800 md:text-xl'>
                        You might have the wrong address, or the page may have moved.
                    </p>
                    <button onClick={() => navigate('/')} className='w-full mb-2 py-2 px-3 text-white mt-3 bg-orange-400 sm:w-auto sm:mb-0'>
                        Back to homepage
                    </button>
                </div>
                <div>
                    <div className='w-full h-full rounded-lg'>
                        <img
                            src='https://www.webtekno.com/images/editor/default/0003/49/d69c8ccfa20fc2ef66b4655df8631cd433a037a3.jpeg'
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
