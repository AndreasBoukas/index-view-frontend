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

export default {
  name: "App",
  components: {
    Nav,
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getExpirationDate", "getToken"]),
  },
  created() {
    //login the user if a token exists
    this.login();
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
    logout() {
      localStorage.removeItem("userData");
      this.setUser(null);
      this.setToken(null);
      this.setExpirationDate(null);

      //This is to prevent the avoided redundant navigation error
      if (this.$route.path != "/login") {
        this.$router.push("/login");
      }
    },
    login() {
      const storedData = JSON.parse(localStorage.getItem("userData"));

      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        this.setToken(storedData.token);
        this.setUser(storedData.user);
        this.setExpirationDate(new Date(storedData.expiration));
        this.$router.push("/");
      }
    },
  },
};
</script>
