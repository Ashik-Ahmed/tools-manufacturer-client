import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useDBUser = (user) => {
    const [dbUser, setDbUser] = useState([]);
    const [dbLoading, setDbLoading] = useState(true);

    useEffect(() => {
        fetch(`https://immense-crag-05467.herokuapp.com/user/${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setDbUser(data);
                setDbLoading(false);
            })
    }, [user])
    return [dbUser, dbLoading];
}

export default useDBUser;