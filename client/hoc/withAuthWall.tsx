import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useLoggedUser from "../hooks/useLoggedUser";
import CircularPageLoader from "../components/shared/CircularPageLoader";
import {userRole} from "../consts/User";

type RequiredUserRoleProp = userRole.USER | userRole.ADMIN | null;

const withAuthWall = (WrappedComponent) => (requiredUserRole: RequiredUserRoleProp) => (props) => {
    const loggedUser = useLoggedUser();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        loggedUser().then((data: any) => {
            setUser(data ? data.loggedUser : null);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <CircularPageLoader />;
    }

    // admin has access everywhere
    if (user && user.role === userRole.ADMIN) {
        return <WrappedComponent {...props} />;
    }

    if (!user && requiredUserRole === null || (user && user.role === requiredUserRole)) {
        return <WrappedComponent {...props} />;
    }

    router.push({pathname: '/about'});
    return <CircularPageLoader />;
};

export default withAuthWall;
