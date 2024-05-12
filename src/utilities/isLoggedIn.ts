import * as jose from 'jose';
import { JWT_LOCAL_STORAGE_KEY } from '../constants/localStorage';

export default function isLoggedIn() {
    const rawJwt = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (!rawJwt) return false;

    const jwt = jose.decodeJwt(rawJwt);
    if (jwt.exp === undefined) return true;
    if (jwt.exp < Date.now()) return true;

    return false;
}