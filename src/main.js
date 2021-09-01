import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
    expirationDate: null,
    isloading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setExpirationDate(state, expirationDate) {
      state.expirationDate = expirationDate;
    },
    setIsLoading(state, isloading) {
      state.isloading = isloading;
    }
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getExpirationDate(state) {
      return state.expirationDate;
    },
    getToken(state) {
      return state.token;
    },
    getIsLoading(state) {
      return state.isloading;
    }
  },
});

new Vue({
  vuetify,
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
