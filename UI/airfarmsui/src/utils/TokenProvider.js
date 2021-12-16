import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

export const TokenProvider = () => {

    /* Implementation */
    const _token = {
        accessToken:'',
        refreshToken: ''
    }

    //const secret = useAccessToken()

    const getToken = async () => {
        let accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)airfarms_access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        _token.accessToken = accessToken

        return _token && _token.accessToken;
    };

    const isLoggedIn = () => {
        let logged = false
        getToken()
        if(_token.accessToken === 'undefined' || (_token.accessToken.length === 0 && _token.refreshToken.length === 0))
        {
            logged = false;
        }
        else
        {
            logged = true;
        }
        return logged;
    };

    let observers = [];

    const subscribe = (observer) => {
        observers.push(observer);
    };

    const unsubscribe = (observer) => {
        observers = observers.filter(_observer => _observer !== observer);
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    const setToken = () => {
        let accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)airfarms_access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        const token = {
            accessToken: accessToken,
            refreshToken: ''
            };
        if (token) 
        {
            //setAccessToken(token.accessToken)
            _token.accessToken = token.accessToken
        } 
        else 
        {
            _token = __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        }
        notify();
    };

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

export const {isLoggedIn} = TokenProvider();