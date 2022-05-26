import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import bannerImage from '../../Assets/images/banner.png'
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import ReviewCard from '../ReviewCard/ReviewCard';
import Loading from '../Shared/Loading';

const Home = () => {

    const [user, loading] = useAuthState(auth);
    const [dbUser] = useDBUser(user)

    const [products, isLoading, refetch] = useProducts();
    // const [reviews, setReviews] = useState([]);

    const { data: reviews, reviewLoading } = useQuery('reviews', () => fetch('https://immense-crag-05467.herokuapp.com/reviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }).then(res => res.json()))

    if (isLoading || loading || reviewLoading || products.length < 1) {
        return <Loading />
    }

    if (user) {
        refetch();
    }

    return (
        <div>
            <div class="hero h-80" style={{ "background-image": `url(${bannerImage})` }}>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">Welcome</h1>
                        <p class="mb-5">Number 1 tools wholeseller in the country</p>
                        <button class="btn btn-primary">Start Buying</button>
                    </div>
                </div>
            </div >

            <div>
                <div className='md:flex my-5 gap-x-4 mx-auto w-full justify-center'>
                    {
                        products.length > 0 && products?.slice(0, 6).map(product => <Product key={product._id} product={product}></Product>)
                    }
                </div>
                {dbUser.role !== 'admin' && <Link to='/all-products' className='btn btn-secondary'>See All Products</Link>}
            </div>

            <div className='text-3xl font-bold text-primary text-left md:mx-12 mt-8'>
                <div className=' pb-3 border-b-4 mb-6'>{dbUser?.role === 'admin' ?

                    <p>Products Need to Restock</p>

                    :

                    <p>Popular Items This Month</p>

                }

                </div>

                <div className='md:flex gap-4 justify-center'>
                    {
                        products.map(product => {
                            if (product.quantity < 10) {
                                return <Product key={product._id} product={product}></Product>

                            }
                        })
                    }
                </div>



            </div>

            <div class="stats shadow w-full md:w-3/4 mx-auto md:my-10">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div class="stat-title">Total Users</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">15% new users last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div class="stat-title">Successfully delivered</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">Orders to our customers</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <div class="avatar online">
                            <div class="w-16 rounded-full">
                                <img src="https://api.lorem.space/image/face?w=128&h=128" />
                            </div>
                        </div>
                    </div>
                    <div class="stat-value">98%</div>
                    <div class="stat-desc text-secondary">Delivery success rate</div>
                </div>

            </div>


            <div className='mt-8'>
                <h3 className='text-3xl font-bold pb-2 md:mx-12 text-left text-primary border-b-4'>What People Say About Us</h3>

                <div className='md:grid grid-cols-2 py-4 md:mx-32'>
                    {
                        reviews && reviews.map(review => <ReviewCard key={review.id} review={review}></ReviewCard>)
                    }
                </div>

            </div>

            <div className='my-10 text-left md:mx-20'>
                <h3 className='text-3xl font-bold pb-2 mb-4 text-left text-primary border-b-4'>Our Vision</h3>
                <div className='text-lg italic'>
                    <p>
                        <span className=' text-secondary font-bold'>Tool House</span> started it's journey before 5 years ago. We have started with a very small varieties of products. But, day by day, our customer increased and varieties of products increased as well. Now we are one of the biggest wholeseller in the country. We have <span className='text-secondary'>Awarded as the Best Tool making company</span>. This all happened because of the love of our consumers.
                    </p>
                    <p>
                        We are commited to give the best service to our comsumers. They are our inspiration to go ahead. We have seen that our customer liked us so much. They give us valuable suggestion everyday to improve the quality of our service. We are following them accordingly. Also, we are taking our customers negative as our suggestion to improve ourselves.

                    </p>
                </div>
            </div>

        </div >
    );
};

export default Home;