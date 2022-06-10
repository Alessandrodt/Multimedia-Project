import axios from "axios";
import { Link } from "react-router-dom";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    req => {
        req.headers['x-Auth-Token'] = sessionStorage.getItem('Auth Token');
        return req
    },
    err => {
        return Promise.reject(err);
    }
);

axiosInstance.interceptors.response.use(
    res => {
        return res
    },
    err => {
        const status = err.response ? err.response.status : null ;
        
        if (status === 401) {
            <Link to='/' />
            console.log("This works?")
        };

        Promise.reject(err)
    }
)
