import Config from "../../config.json";
import { store } from "../main.js";
// import router from "../router";

export default {
  data: () => ({
    errorMessage: "",
  }),
  methods: {
    login: async function(username, password) {
      store.state.isloading = true;
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(
          `${Config.VUE_APP_BACKEND_URL}/login_check`,
          requestOptions
        );
        const responseData = await response.json();
        if (!response.ok) {
          //Check for 400ish and 500ish errors
          this.errorMessage = responseData.message;
          store.state.isloading = false;
          throw new Error(responseData.message);
        }

        const tokenExpirationDate = new Date(
          new Date().getTime() + 1000 * 60 * 10
        ); //expires in 10 minutes

        localStorage.setItem(
          "userData",
          JSON.stringify({
            user: username,
            token: responseData.token,
            expiration: tokenExpirationDate.toISOString(),
          })
        );
        store.state.user = username;
        store.state.token = responseData.token;
        store.state.expirationDate = tokenExpirationDate;
        store.state.isloading = false;
        this.$router.push("/");
      } catch (err) {
        store.state.isloading = false;
        console.log("Request failed", err);
        throw err;
      }

      return this.errorMessage;
    },
    register: async function(username, password) {
      store.state.isloading = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `_username=${username}&_password=${password}`,
      };
      try {
        const response = await fetch(
          `${Config.VUE_APP_BACKEND_URL}/register`,
          requestOptions
        );
        const responseData = await response.json(); // parse response data
        if (!response.ok) {
          //Check for 400ish and 500ish errors
          this.errorMessage = responseData;
          store.state.isloading = false;
          throw new Error(responseData.message);
        }
        this.login(username, password);
        store.state.isloading = false;
      } catch (err) {
        store.state.isloading = false;
        console.log("Request failed", err);
        throw err;
      }

      return this.errorMessage;
    },
    logout: function() {
      localStorage.removeItem("userData");
      store.state.user = null;
      store.state.token = null;
      store.state.expirationDate = null;

      //This is to prevent the avoided redundant navigation error
      if (this.$route.path != "/login") {
        this.$router.push("/login");
      }
    },
  },
};
