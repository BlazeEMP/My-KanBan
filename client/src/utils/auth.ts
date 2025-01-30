import { JwtPayload, jwtDecode } from 'jwt-decode';

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
        // TODO: return a value that indicates if the token is expired
    }

    getToken(): string {
        // TODO: return the token
    }

    login(idToken: string) {
        // TODO: set the token to localStorage
        // TODO: redirect to the home page
    }

    logout() {
        // TODO: remove the token from localStorage
        // TODO: redirect to the login page
    }
}

export default new AuthService();
