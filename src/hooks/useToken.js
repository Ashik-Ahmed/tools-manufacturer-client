import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        // const name = user?.user?.displayName;
        // const photo = user?.user?.photoURL;
        const currentUser = {
            email: email,
        };

        // console.log('useToken info', email);

        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(currentUser),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('data from useToken', data);
                })
        }

    }, [user])
    return [token];
}

export default useToken;