import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useDBUser = () => {
    const [user] = useAuthState(auth);
    const [dbUser, setDbUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data)
            })
    }, [user])
    return [dbUser];
}

export default useDBUser;