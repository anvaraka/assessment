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
        <div class="Header__right">
          <button class="Header__rightBtn">
            <router-link to="/signup">Register</router-link>
          </button>
          <button class="Header__logo">
            <router-link to="/signIn">
              <img
                class="Header__rightImg"
                src="../assets/user-circle.png"
                alt="user"
              />
            </router-link>
          </button>
        </div>
      </header>
      <div class="Content">
        <h2 class="Content__price">{{ price }}</h2>
        <h3 class="Content__textCopy">{{ bonusText }}</h3>
        <button class="Content__btn">
          <router-link to="/signup">Sign Up</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      price: "",
      bonusText: "",
    };
  },
  mounted() {
    this.fetchHomePageText();
  },
  methods: {
    async fetchHomePageText() {
      try {
        const response = await axios.get("http://localhost:3000/api/homepage");
        this.price = response.data.price;
        this.bonusText = response.data.bonusText;
      } catch (error) {
        console.error("Error fetching home page text:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/styles.scss";
@import "../scss/mixins/breakpoints";

.Header {
  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: rem(20px);
  }

  &__rightBtn a {
    padding: rem(10px) rem(20px);
    font-size: rem(15px);
    display: block;
  }

  &__logo {
    background: none;
    border: none;
    padding: 0;
    a {
      display: block;
    }
  }
  &__rightImg {
    width: rem(30px);
    height: rem(30px);
  }
}

.Content {
  &__price,
  &__textCopy {
    margin: rem(20px);
  }

  &__price {
    font-size: rem(45px);
  }
  &__textCopy {
    font-size: rem(40px);
  }
  &__btn a {
    padding: rem(20px) rem(25px);
    font-size: rem(25px);
    display: block;
  }
}
</style>
