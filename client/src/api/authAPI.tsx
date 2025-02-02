import { UserLogin } from "../interfaces/UserLogin";

// login POST initally generated with gpt4 copilot, changed messages for clarity
const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Network response was not ok on login, check the network tab');
        }
        return data;
    } catch (error) {
        console.error('There was a problem with the login request: ', error);
        throw error;
    }
}

export { login };