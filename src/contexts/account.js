import { createStore } from "@fallingsnow/react-contextual";
import api from "../api";

// This is the global account store's default state
const store = createStore({
  email: undefined, // There is no email initial since no user is logged in

  register: async formdata => {
    // Ask the server to register user

    try {
      const response = await api.post("/users", formdata);

      // Now we return what the updated information to the global account store
      return {
        email: formdata.get("email")
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
  login: async formdata => {
    // Ask the server to register user

    try {
      const response = await api.post("/users/login", formdata);
      const email = formdata.get("email");
      const subjectName = email.substring(0, email.indexOf("@"));
      // Now we return what the updated information to the global account store
      return {
        email,
        subjectName
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
      const response = await api.head("/users/logout");

      // Now we return what the updated information to the global account store
      return {
        email: undefined
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
console.debug("attempting to validate previous token");
api
  .get("/users/status")
  .then(res => {
    setState(res.data, () => console.debug(store.state));
  })
  .catch(console.warn);

function setState(state, cb) {
  if (store.state.setState) {
    window.authenticated = true;
    return store.state.setState(state, cb);
  } else {
    Object.assign(store.state, state);
    window.authenticated = false;
  }
  cb && cb(store.state);
}

export default store;
