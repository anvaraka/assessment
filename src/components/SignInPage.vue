<template>
  <div class="container">
    <div class="wrapper">
      <header class="Header">
        <router-link to="/" class="Header__left">
          <img
            class="Header__leftImg"
            src="../assets/JC_Logo_Col_Dark_300.png"
            alt="logo"
          />
        </router-link>
      </header>
      <div class="Content">
        <form @submit.prevent="submitForm">
          <h2>Sign In</h2>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            v-model="email"
            required
          />

          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            v-model="password"
            required
          />

          <button type="submit">Sign In</button>
          <p class="copy">
            Don't have an account?
            <router-link to="/signup" class="">Sign Up</router-link>
          </p>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email: this.email,
          password: this.password,
        });

        const { token } = response.data;

        localStorage.setItem("token", token);

        this.email = "";
        this.password = "";

        this.$router.push("/dashboard");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.error = error.response.data.message;
        } else {
          this.error = "Error signing in. Please try again.";
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/styles.scss";

form {
  display: flex;
  flex-direction: column;
  grid-gap: rem(10px);
  padding: rem(20px);
  background: linear-gradient(to right, #5a057a, #8416ac);
  border: solid rem(5px) white;
  border-radius: rem(10px);
  justify-items: center;
  align-items: center;
  width: 40vw;
  min-width: rem(150px);
  max-width: rem(350px);
  margin: auto;
}
</style>
