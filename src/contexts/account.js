import {
    createStore
} from 'react-contextual';
import api from '../api';

// This is the global account store's default state
export default createStore({
    username: undefined, // There is no username initial since no user is logged in

    register: async (formdata) => {
        // Ask the server to register user

        try {
            const response = await api.post('/users', formdata);

             api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            // Now we return what the updated information to the global account store
            return {
                username: formdata.get('username')
            };
        }
        catch (error) {
            console.error(error);
            /**
             * this will print the error message sent by the
             * server in the response body. It could be empty
             * depending on what was sent back.
             */
            throw new Error(error.response.data.error);
            /**
             * this will print the generic error that the
             * browser will use upon a failed network request
             */
            // throw new Error(error.message);
        }
    },
    login: async (formdata) => {
        // Ask the server to register user

        try {
            const response = await api.post('/users/login', formdata);

             api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;


            // Now we return what the updated information to the global account store
            return {
                username: formdata.get('username')
            };
        }
        catch (error) {
            console.error(error);
            /**
             * this will print the error message sent by the
             * server in the response body. It could be empty
             * depending on what was sent back.
             */
            throw new Error(error.response.data.error);
            /**
             * this will print the generic error that they
             * browser will use upon a failed network request
             */
            // throw new Error(error.message);
        }
    },
    logout: () => {
        delete api.defaults.headers.common['Authorization'];

        return {username: undefined};
    }
});
