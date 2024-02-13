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
          <h2>Sign Up</h2>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            v-model="name"
            required
          />
          <label for="name">Surname:</label>
          <input
            type="text"
            id="surname"
            placeholder="Enter your surname"
            v-model="surname"
            required
          />
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

          <label for="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            v-model="confirmPassword"
            required
          />

          <button type="submit">Sign Up</button>
          <p class="copy">
            Already have an account?
            <router-link to="/signIn" class="">Sign In</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "SignUpPage",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post("/api/signup", {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
        });

        this.$router.push("/signIn");

        alert(response.data.message);

        // Clear form fields
        this.name = "";
        this.surname = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      } catch (error) {
        // Handle errors
        console.error("Error signing up:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert("Error signing up: " + error.response.data.message);
        } else {
          alert("Error signing up. Please try again.");
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
