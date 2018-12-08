import {
    createStore
} from 'react-contextual';
import api from '../api';
import cookies from 'js-cookie';

// This is the global account store's default state
const store = createStore({
    username: undefined, // There is no username initial since no user is logged in

    register: async (formdata) => {
        // Ask the server to register user

        try {
            const response = await api.post('/users', formdata);

            // Now we return what the updated information to the global account store
            return {
                username: formdata.get('username')
            };
        } catch (error) {
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

            // Now we return what the updated information to the global account store
            return {
                username: formdata.get('username')
            };
        } catch (error) {
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
    logout: async () => {
        console.debug("Logging out...");
        try {
            const response = await api.head('/users/logout');

            // Now we return what the updated information to the global account store
            return {
                username: undefined
            };
        } catch (error) {
            console.error(error);
            /**
             * this will print the error message sent by the
             * server in the response body. It could be empty
             * depending on what was sent back.
             */
            throw new Error(error);
            /**
             * this will print the generic error that they
             * browser will use upon a failed network request
             */
            // throw new Error(error.message);
        }

    }
});

// Check if the user is already authenticated
const hasToken = cookies.get('has-token');
if (hasToken) {
    console.debug('attempting to validate previous token');
    api.get('/users/status').then(res => {
        store.state.setState(res.data);
    }).catch(function() {
        console.error.apply(console, arguments);
        cookies.remove('has-token');
    });
}

export default store;
