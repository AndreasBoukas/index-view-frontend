<template>
  <v-app>
    <!-- Navbar -->
    <Nav />

    <!-- Rest of the content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import authMixin from "./mixins/authMixin.js";

export default {
  name: "App",
  components: {
    Nav,
  },
  mixins: [authMixin],
  computed: {
    ...mapGetters(["isLoggedIn", "getExpirationDate", "getToken"]),
  },
  created() {
    //login the user if a token exists
    const storedData = JSON.parse(localStorage.getItem("userData")); // if the token hasnt expired
    if (storedData) {
      this.setToken(storedData.token);
      this.setUser(storedData.user);
      this.setExpirationDate(new Date(storedData.expiration));
      this.$router.push("/");
    }
  },
  updated() {
    //Loggout the user when the token expires
    if (this.getToken && this.getExpirationDate) {
      if (this.getExpirationDate.getTime() < new Date().getTime()) {
        this.logout();
      }
    }
  },
  methods: {
    ...mapMutations(["setUser", "setToken", "setExpirationDate"]),
  },
};
</script>
