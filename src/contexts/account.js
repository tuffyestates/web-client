import {
    createStore
} from 'react-contextual';
import Cookies from 'js-cookie';

export default createStore({
    username: null,
    login: async (formdata) => {
        // Ask the server to register user
        const response = await fetch('http://direct.sparling.us:11638/api/register', {
            method: 'post',
            body: formdata
        });
        const body = await response.json();

        // Handle server response
        if (!body.success)
            throw new Error('Incorrect username or password');

        // Set a cookie for 2 reasons:
        // 1) cookies are sent with all http requests so all future fetches will have authentication
        // 2) users will not have to login again if they leave the site and return within the same browser session
        // *) you can also set an expires so that the cookie persists through sessions (Ex. [x] remember me)
        Cookies.set('apiKey', body.key);

        return {
            username: formdata.get('username')
        };
    }
});
