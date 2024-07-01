// hooks/UseUser.js
const useUser = (registeredUsers) => {
    const getUserByEmail = (email) => {
        return registeredUsers.find(user => user.email === email);
    };

    return { getUserByEmail };
};

export default useUser;
