import { useState, useEffect} from 'react';
import axios from 'axios';
import { getToken } from '../utils/tokenService';

const useUser = (initialUsers = []) => {
    const [registeredUsers, setRegisteredUsers] = useState(initialUsers);

    useEffect(() => {
        fetchUsersFromDB();
    }, []);

    const fetchUsersFromDB = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 204) {
                console.log('No content in response');
                return;
            }
            const data = await response.json();
            setRegisteredUsers(data);
        } catch (error) {
            console.error('Error fetching users from DB:', error);
        }
    };
    const getUserByEmail = (email) => {
        return registeredUsers.find(user => user.email === email);
    };

    const registerUser = (userData) => {
        setRegisteredUsers([...registeredUsers, userData]);
    };

    const setFirstName = (email, newFirstName) => {
        setRegisteredUsers(registeredUsers.map(user => {
            if (user.email === email) {
                return { ...user, firstName: newFirstName };
            }
            return user;
        }));
    };

const updateUser = async (email, updatedUserData) => {
    try {
        const token = getToken();
        const response = await axios.patch(`http://127.0.0.1:8080/api/users/${email}`, updatedUserData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        setRegisteredUsers(registeredUsers.map(user => {
            if (user.email === email) {
                return { ...user, ...response.data };
            }
            return user;
        }));
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

    return { getUserByEmail, registerUser, setFirstName, updateUser, registeredUsers };
};

export default useUser;
