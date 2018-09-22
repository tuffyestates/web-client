import {
    createStore
} from 'react-contextual';
import { registerUser } from '../api/userAPI'
// import { apiClient } from '../api/apiClient'

// This is the global account store's default state
export default createStore({
    username: null, // There is no username initial since no user is logged in

    login: async (formdata) => {
        // Ask the server to register user

        try {
            const response = await registerUser(formdata);

            /**
             * If you want to set an option to include cookies on every request sent with axios,
             * then you can either set the withCredentials config option here or
             * set it in the dataClient.js file directly. Either one should work.
             *
             * apiClient.defaults.withCredentials = true;
             */

            /**
             * Same goes for sending a JWT in the Authentication Header
             * on every request. Just simply edit the axios instance!
             *
             * apiClient.defaults.headers.common['Authorization'] = `Bearer ${JWT_access_token}`
             */

            // Now we return what the updated information to the global store
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
    }
});
