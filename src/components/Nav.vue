<template>
  <v-app-bar app color="gray" dark>
    <v-app-bar-title>Index View</v-app-bar-title>
    <v-spacer></v-spacer>
    <div id="navbar" class="navbar-menu">
      <v-btn to="/" v-if="isLoggedIn" class="ms-3" color="blue">Home</v-btn>
      <v-btn to="/login" v-if="!isLoggedIn" class="ms-3" color="blue"
        >Login</v-btn
      >
      <v-btn
        to="/login"
        v-if="isLoggedIn"
        @click="logout"
        class="ms-3"
        color="blue"
        >Logout</v-btn
      >
      <v-btn to="/register" v-if="!isLoggedIn" ms="6" class="ms-3" color="blue"
        >Register</v-btn
      >
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import authMixin from "../mixins/authMixin"

export default {
  name: "Nav",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations(["setUser", "setToken", "setExpirationDate"]),
  },
  mixins: [ authMixin ]
};
</script>

<style>
</style>