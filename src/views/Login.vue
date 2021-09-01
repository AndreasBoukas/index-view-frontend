<template>
  <div>
    <div v-if="getIsLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
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
    <div class="d-flex justify-center mt-6">
      <v-alert color="red" type="error" v-if="errorMessage != ''">{{
        errorMessage
      }}</v-alert>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import Config from "../../config.json";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    show1: false,
    authToken: "",
    errorMessage: "",
  }),
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required },
  },
  computed: {
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
    async submit() {
      this.$v.$touch();
      this.setIsLoading(true);
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          username: this.$v.username.$model,
          password: this.$v.password.$model,
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
          this.setIsLoading(false);
          throw new Error(responseData.message);
        }

        this.authToken = responseData.token;
        const tokenExpirationDate = new Date(
          new Date().getTime() + 1000 * 60 * 10
        ); //expires in 10 minutes

        localStorage.setItem(
          "userData",
          JSON.stringify({
            user: this.$v.username.$model,
            token: this.authToken,
            expiration: tokenExpirationDate.toISOString(),
          })
        );
        this.setUser(this.$v.username.$model);
        this.setToken(this.authToken);
        this.setExpirationDate(tokenExpirationDate);
        this.setIsLoading(false);
        this.$router.push("/");
      } catch (err) {
        this.setIsLoading(false);
        console.log("Request failed", err);
        throw err;
      }
    },
  },
};
</script>
