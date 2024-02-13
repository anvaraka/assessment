<template>
  <div class="container">
    <div class="wrapper">
      <header class="Header">
        <button class="Header__left">
          <router-link to="/">
            <img
              class="Header__leftImg"
              src="../assets/JC_Logo_Col_Dark_300.png"
              alt="logo"
            />
          </router-link>
        </button>
      </header> 
      <div class="Content">
        <div class="Content__wrapper">
          <div class="Content__data" v-if="user">
            <h2 class="Content__heading">
              Welcome {{ user.name }} <br />
              You are inside your Dashboard
            </h2>
            <p class="Content__userInfo">Name: {{ user.name }}</p>
            <p class="Content__userInfo">Surname: {{ user.surname }}</p>
            <p class="Content__userInfo">Email: {{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashBoard",
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await axios.get("http://localhost:3000/api/user", {
        headers: {
          authorization: token,
        },
      });

      this.user = response.data;
    } catch (error) {
      console.error("Error retrieving user information:", error);
    }
  },
};
</script>

<style scoped lang="scss">
@import "../scss/styles.scss";
@import "../scss/mixins/breakpoints";

.Content {
  &__wrapper {
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
}
</style>
