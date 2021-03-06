import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import UserRow from './UserRow';

const ManageUsers = () => {

    //const [users, setUsers] = useState([]);

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://immense-crag-05467.herokuapp.com/users', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className='text-3xl font-bold text-primary mt-4'>Manage Users</h2>

            <div class="overflow-x-auto m-6">
                <table class="table w-full  ">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Email</th>
                            <th>User Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 && users?.map(user => <UserRow key={user._id} user={user} refetch={refetch}></UserRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageUsers;