import {useDispatch} from 'react-redux';
import {setLoggedUser} from '../state/auth/authSlice';
import axios from "axios";

// hook to get current logged user (based on http only cookies) and put info about him to auth reducer
const useLoggedUser = () => {
    const dispatch = useDispatch();

    const loggedUser = async () => {
        const {data} = await axios.get('/api/loggedUser');
        if (data) dispatch(setLoggedUser(data.loggedUser));
    };

    return loggedUser;
}

export default useLoggedUser;
