import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const baseUrl = '/api/users'

const sendAuthRequest =  async(reqPromise, onSuccess) => {
    const toastId = toast.loading('Checking user date...');
    try{
        await reqPromise;
        toast.update(toastId, { render: "You are logged", type: "success", isLoading: false, autoClose: 2000 });
        onSuccess();
    }catch(err){
        console.log(err);
        toast.update(toastId, { 
            render: err.response.data.error.message || "There is a problem",
            type: "error",
            isLoading: false, 
            autoClose: 2000, 
            closeButton: true,
         });
    }
}

export const signup = async (credentials) => {
    return axios.post('/api/users/register', credentials);
} 

export const signin =  (credentials) => {
    return axios.post('/api/users/login', credentials);
} 

export const logout = () => {
    return axios.post('/api/users/logout');
}

export default sendAuthRequest;


