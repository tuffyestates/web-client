import {
    createStore
} from 'react-contextual';
import Cookies from 'js-cookie';
import { registerUser } from '../api/userAPI'
import { dataClient } from '../api/dataClient'

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
             * dataClient.defaults.withCredentials = true;
             */

            // Set a cookie for 2 reasons:
            // 1) cookies are sent with all http requests so all future fetches will have authentication
            // 2) users will not have to login again if they leave the site and return within the same browser session
            // *) you can also set an expires so that the cookie persists through sessions (Ex. [x] remember me)
            //Cookies.set('apiKey', body.key);

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
            throw new Error(error.response.data);
            /**
             * this will print the generic error that the 
             * browser will use upon a failed network request
             */
            // throw new Error(error.message);
        }
    }
});
