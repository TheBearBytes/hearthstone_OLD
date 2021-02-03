import {useDispatch} from 'react-redux';
import {useLazyQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "../apollo/queries/auth";
import {setLoggedUser} from '../state/auth/authSlice';
import {useEffect} from "react";

// hook to get current logged user (based on http only cookies) and put info about him to auth reducer
const useLoggedUser = () => {
    const dispatch = useDispatch();
    const [getLoggedUser, {data}] = useLazyQuery(GET_LOGGED_USER, {
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        if (data) {
            dispatch(setLoggedUser(data.loggedUser));
        }
    }, [data]);

    const loggedUser = () => {
        getLoggedUser();
    };

    return loggedUser;
}

export default useLoggedUser;
