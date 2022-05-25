import userImage from '../../../Assets/images/user.png'
import useDBUser from '../../../hooks/useDBUser';

const UserRow = ({ user, refetch }) => {

    const [dbUser] = useDBUser(user);

    const handleMakeAdmin = () => {
        fetch(`http://localhost:5000/user/${dbUser.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ role: 'admin' }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }


    return (
        <tr className='hover:bg-red-200'>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={dbUser.photo || userImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                <div>
                    <div class="font-bold">{dbUser.email}</div>
                </div>

            </td>
            <td>{dbUser.role === 'admin' ? <p>Admin</p> : <p>Regular User</p>}</td>
            <th>
                {dbUser.role === 'admin' ? <p>Already an Admin</p> :
                    <div className='flex gap-x-3'>
                        <button onClick={() => handleMakeAdmin(dbUser._id)} class="btn bg-green-600 btn-xs">Make Admin</button>

                    </div>}
            </th>
        </tr>
    );
};

export default UserRow;