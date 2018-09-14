import {
    createStore
} from 'react-contextual';
import Cookies from 'js-cookie';

// This is the global account store's default state
export default createStore({
    username: null, // There is no username initial since no user is logged in

    login: async (formdata) => {
        // Ask the server to register user
        const response = await fetch(`${process.env.API_PATH}/register`, {
            method: 'post',
            body: formdata
        });
        const body = await response.json();

        // Handle server response
        if (!response.ok)
            throw new Error(body.error);

        // Set a cookie for 2 reasons:
        // 1) cookies are sent with all http requests so all future fetches will have authentication
        // 2) users will not have to login again if they leave the site and return within the same browser session
        // *) you can also set an expires so that the cookie persists through sessions (Ex. [x] remember me)
        Cookies.set('apiKey', body.key);

        // Now we return what the updated information to the global store
        return {
            username: formdata.get('username')
        };
    }
});
