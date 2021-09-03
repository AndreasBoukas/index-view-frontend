<template>
  <div>
    <!-- Loading circle -->
    <div v-if="getIsLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <!-- Register Form -->
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
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="repeatPassword"
          :error-messages="repeatPasswordErrors"
          :type="show2 ? 'text' : 'password'"
          label="Repeat Password"
          required
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn class="mr-4" @click="submit"> Register </v-btn>
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
import authMixin from "../mixins/authMixin"
import {
  required,
  maxLength,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
// import Register from "../composables/register.js";

export default {
  name: "Register",
  data: () => ({
    //form fields
    username: "",
    password: "",
    repeatPassword: "",
    //show1 and show2 are for revealing the password
    show1: false,
    show2: false,
    errorMessage: "",
  }),
  mixins: [validationMixin, authMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required, minLength: minLength(6) },
    repeatPassword: { required, sameAsPassword: sameAs("password") },
  },
  computed: {
    //Check for validation Errors
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
      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("The Password must match.");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    ...mapGetters(["isLoggedIn", "getIsLoading"]),
  },
  methods: {
    ...mapMutations([
      "setUser",
      "setToken",
      "setExpirationDate",
      "setIsLoading",
    ]),

    async submit() {
      this.$v.$touch();
      this.register(
        this.$v.username.$model,
        this.$v.password.$model
      );
    },
  },
};
</script>
