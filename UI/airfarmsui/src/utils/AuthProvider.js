import React, { useEffect, useState } from "react"
import {TokenProvider} from './TokenProvider'
import axios from 'axios';
axios.defaults.withCredentials = true;

export const AuthProvider = () => {

    const tokenProvider = TokenProvider();

    const login = (newTokens) => {
        tokenProvider.setToken();
    };
    
    const logout = () => {
        tokenProvider.setToken();
    };

    const authPost = async (url, body, init, isLogin) => {
        
        init = init || {};
        if(!isLogin)
        {      
            const token = await tokenProvider.getToken();
    
            init.headers = {
                ...init.headers,
                Authorization: `Token ${token}`,
            };
        }  
        return axios.post(url, body, init)      
    };

    const authPatch = async (url, body, init) => {
        
        init = init || {};
        const token = await tokenProvider.getToken();
    
        init.headers = {
            ...init.headers,
            Authorization: `Token ${token}`,
        };
        
        return axios.patch(url, body, init)      
    };

    const authGet = async (url, init) => {
        
        init = init || {};
        const token = await tokenProvider.getToken();
    
        init.headers = {
            ...init.headers,
            Authorization: `Token ${token}`,
        };
        
        return axios.get(url, init)      
    };

    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());
    
        useEffect(() => {
            const listener = (newIsLogged) => {
                setIsLogged(newIsLogged);
            };
            
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);
    
        return [isLogged];
    };

    return {
        useAuth,
        authPost,
        authPatch,
        authGet,
        login,
        logout
    };
};

export const {useAuth, authPost, login, logout} = AuthProvider();
//export default {createAuthProvider};