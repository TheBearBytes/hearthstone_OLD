import {useDispatch} from 'react-redux';
import {setLoggedUser} from '../state/auth/authSlice';
import {useEffect, useState} from "react";
import axios from "axios";

// hook to get current logged user (based on http only cookies) and put info about him to auth reducer
const useLoggedUser = () => {
    const dispatch = useDispatch();
    // const [_loggedUser, _setLoggedUser] = useState();

    // useEffect(() => {
    //     if (_loggedUser) {
    //         dispatch(setLoggedUser(_loggedUser));
    //     }
    // }, [_loggedUser]);

    const loggedUser = async () => {
        const {data} = await axios.get('/api/loggedUser');
        if (data) dispatch(setLoggedUser(data.loggedUser));
    };

    return loggedUser;
}

export default useLoggedUser;
