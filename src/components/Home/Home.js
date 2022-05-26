import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import bannerImage from '../../Assets/images/banner.png'
import auth from '../../firebase.init';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import ReviewCard from '../ReviewCard/ReviewCard';
import Loading from '../Shared/Loading';

const Home = () => {

    const [user, loading] = useAuthState(auth);

    const [products, isLoading, refetch] = useProducts();
    // const [reviews, setReviews] = useState([]);

    const { data: reviews } = useQuery('reviews', () => fetch('http://localhost:5000/reviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }).then(res => res.json()))

    if (isLoading || loading || products.length < 1) {
        return <Loading />
    }

    if (user) {
        refetch();
    }

    return (
        <div>
            <div class="hero h-80" style={{ "background-image": `url(${bannerImage})` }
            }>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">Welcome</h1>
                        <p class="mb-5">Number 1 tools wholeseller in the country</p>
                        <button class="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div >

            <div>
                <div className='md:flex my-5 gap-x-4 mx-auto justify-center'>
                    {
                        products.length > 0 && products?.slice(0, 6).map(product => <Product key={product._id} product={product}></Product>)
                    }
                </div>
                <Link to='/all-products' className='btn btn-primary'>See All Products</Link>
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
                <h3 className='text-3xl font-bold pb-2 border-b-4'>What People Say About Us</h3>

                <div className='md:grid grid-cols-2 py-4 md:mx-32'>
                    {
                        reviews.map(review => <ReviewCard key={review.id} review={review}></ReviewCard>)
                    }
                </div>

            </div>

        </div >
    );
};

export default Home;