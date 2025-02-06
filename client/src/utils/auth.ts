import { JwtPayload, jwtDecode } from 'jwt-decode';
import { redirect } from 'react-router-dom';

class AuthService {
    getProfile() {
        const rawToken = localStorage.getItem('token');
        if (!rawToken) {
            return null;
        }
        const token = jwtDecode<JwtPayload>(rawToken);
        return token;
    }

    loggedIn() {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    }

    isTokenExpired(token: string) {
        // Return a value that indicates if the token is expired based on it's expiration time, any token lacking expiration will not be allowed and give an appropriate error message
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            if (!decodedToken.exp) {
                console.error('JWT token has no expiration date!!! Invalidating... Please update so all tokens have an expiration date.');
                return true;
            }
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds required for JWT comparison
            return decodedToken.exp < currentTime; // Token is expired if token expiration passes current time, evaluates function on return
        } catch (err) {
            console.error('Failed to decode token. Invalidating... Please check JWT setup', err);
            return true; // Treat as expired if token can't be decoded
        }
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }

    login(idToken: string) {
        localStorage.setItem('token', idToken);
        window.location.href = '/';
    }

    logout() {
        localStorage.removeItem('token');
        // window.location.href = '/login'; // Redirect to login page after logout using <Link> in button instead, this requires client side rewrites back to index which contains react router paths to work, only available as static site on render
    }
}

export default new AuthService();