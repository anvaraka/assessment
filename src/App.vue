<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "./scss/styles.scss";
@import "./scss/mixins/breakpoints";

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Inter", Helvetica, Arial, sans-serif;
}

.container {
  background: linear-gradient(to right, #5a057a, #8416ac);
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(./assets/Hero-Image.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  max-width: rem(750px);
  margin: auto;

  @include viewportMin(tablet) {
    background-size: auto;
  }

  .Header__rightBtn,
  .Content__btn {
    border: none;
    border-radius: rem(5px);
    cursor: pointer;
    background: linear-gradient(to right, #5a057a, #8416ac);
    padding: 0;
    a {
      color: white;
      text-decoration: none;
    }

    &:hover {
      background: linear-gradient(to right, #6e0a8e, #9825be);
    }
    transition: background 0.3s ease;
  }

  .Header,
  .Content {
    padding: rem(20px);

    .copy a {
      color: greenyellow;
    }
  }

  .Header {
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.795);
    max-width: rem(750px);

    &__left {
      background: transparent;
      border: 0;
      padding: 0;

      a {
        display: block;
      }
    }
    &__leftImg {
      width: 30vw;
      min-width: rem(120px);
      max-width: rem(300px);
      cursor: pointer;

      @include viewportMin(tablet) {
        max-width: 200px;
      }
    }
  }

  .Content {
    text-align: center;
    color: white;
  }
}
</style>
