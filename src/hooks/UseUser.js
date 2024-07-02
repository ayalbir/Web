// hooks/UseUser.js
import { useState } from 'react';

const useUser = (initialUsers = []) => {
    const [registeredUsers, setRegisteredUsers] = useState(initialUsers || []);

    const getUserByEmail = (email) => {
        return registeredUsers.find(user => user.email === email);
    };

    const registerUser = (userData) => {
        console.log('User registered:', userData);
        setRegisteredUsers([...registeredUsers, userData]);
        console.log('registeredUsers:', registeredUsers);
    };

    const setFirstName = (email, newFirstName) => {
        setRegisteredUsers(registeredUsers.map(user => {
            if (user.email === email) {
                return { ...user, firstName: newFirstName };
            }
            return user;
        }));
    };

    const updateUser = (email, updatedUserData) => {
        setRegisteredUsers(registeredUsers.map(user => {
            if (user.email === email) {
                return { ...user, ...updatedUserData };
            }
            return user;
        }));
    };

    
    return { getUserByEmail, registerUser, setFirstName, updateUser, registeredUsers };
};

export default useUser;