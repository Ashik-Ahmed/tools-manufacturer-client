import React from 'react';

const Blogs = () => {
    return (
        <div className='h-fit text-left md:mx-12 my-5'>
            <div className='pb-2 border-secondary border-b-4'>
                <h2 className='text-2xl text-center font-bold'>Read my Blogs</h2>
            </div>

            <div className='mb-6 mt-6'>
                <h2 className='text-xl font-bold mb-4'>1.	How will you improve the performance of a React Application?</h2>
                <p>There are several ways to enhance the performance of a React app. We can use  react-window and react-virtualized for rendering long lists of data. They provide several reusable compone’nts for displaying lists, grids, and tabular data.
                    We can Avoid Reconciliation by return false from shouldComponentUpdate instead where component doesn’t need to update.
                    We should also use the production build to avoid unnecessary warnings.
                </p>
            </div>

            <div className='mb-6'>
                <h2 className='text-xl font-bold mb-4'>2.	What are the different ways to manage a state in a React application?</h2>
                <p>There are four main types of state you need to properly manage React apps:

                    <ol className='list-disc ml-8'>
                        <li>Local state</li>
                        <li>Global state</li>
                        <li>Server state</li>
                        <li>URL state</li>
                    </ol>
                    <br />
                    <span className='font-bold'>Local (UI) state:</span>  Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook.
                    <br />
                    <span className='font-bold'>Global (UI) state:</span> Global state is data we manage across multiple components.
                    Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.

                    <br />
                    <span className='font-bold'>Server state:</span> Data that comes from an external server that must be integrated with our UI state.
                    Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.
                    <br />
                    <span className='font-bold'>URL state:</span> Data that exists on our URLs, including the pathname and query parameters.
                </p>
            </div>

            <div className='mb-6'>
                <h2 className='text-xl font-bold mb-4'>3.	How does prototypical inheritance work?</h2>
                <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf.</p>
            </div>

            <div className='mb-6'>
                <h2 className='text-xl font-bold mb-4'>4.	Why you do not set the state directly in React. </h2>

                <p>We should never update the state directly because of the following reasons:
                    <ol className='list-disc ml-8'>
                        <li>If we update it directly, calling the setState() afterward may just replace the update we made.</li>
                        <li>When we directly update the state, it does not change this.state immediately. Instead, it creates a pending state transition, and accessing it after calling this method will only return the present value.</li>
                        <li>We will lose control of the state across all components.</li>
                    </ol>
                </p>
            </div>

            <div className='mb-6'>
                <h2 className='text-xl font-bold mb-4'>5.	What is a unit test? Why should write unit tests?</h2>
                <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation.
                    <br />
                    This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.
                    <br />
                    Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                </p>
            </div>
        </div>
    );
};

export default Blogs;