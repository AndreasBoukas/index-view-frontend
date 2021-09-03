<template>
  <div>
    <!-- Loading Circle -->
    <div v-if="getIsLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <!-- Login Form -->
    <div class="d-flex justify-center mt-6">
      <form>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :counter="10"
          label="Username"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :error-messages="passwordErrors"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit"> submit </v-btn>
      </form>
    </div>
    <!-- Display error if there is one -->
    <div class="d-flex justify-center mt-6">
      <v-alert color="red" type="error" v-if="errorMessage != ''">{{
        errorMessage
      }}</v-alert>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import authMixin from "../mixins/authMixin";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
// import login from "../composables/login.js";

export default {
  name: "Login",
  data: () => ({
    // form fields
    username: "",
    password: "",
    show1: false, //show1 is for revealing the password
    authToken: "",
    errorMessage: "",
  }),
  mixins: [validationMixin, authMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required },
  },
  computed: {
    //Check for validation errors
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    ...mapGetters(["getIsLoading"]),
  },
  methods: {
    ...mapMutations([
      "setUser",
      "setToken",
      "setExpirationDate",
      "setIsLoading",
    ]),

    submit() {
      this.$v.$touch();
      this.login(
        this.$v.username.$model,
        this.$v.password.$model
      );
    },
  },
};
</script>
