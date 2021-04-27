import axios from 'axios';
import * as Types from './Types';

export const authStart = () => {
    return {
        type: Types.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: Types.AUTH_SUCCESS,
        token: token,
        id : id
    }
}

export const authFail = error => {
    return {
        type: Types.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('expirationDate');
    return {
        type: Types.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            email: email,
            password: password
        }).then(res => {
            const token = res.data.key;
            const id = res.data.id;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, id));
            dispatch(checkAuthTimeout(3600));
        })
            .catch(error => {
                dispatch(authFail(error))
                console.log(error)
            })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key;
            const id = res.data.id;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, id));
            dispatch(checkAuthTimeout(3600));
        })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, id));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}