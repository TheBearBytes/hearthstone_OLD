import useLoggedUser from "../../hooks/useLoggedUser";
import {useEffect} from "react";
import {useRouter} from "next/router";

const AuthCallback = () => {
    const loggedUser = useLoggedUser();
    const router = useRouter();

    useEffect(() => {
        loggedUser();
        router.push({pathname: '/'});
    }, []);

    return <div>"Spinner"</div>;
}

export default AuthCallback;
