<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="https://firstvet.com/" target="_blank">
      <img
        src="https://firstvet.com/dist/assets/firstvet2021_r-aba8a369.svg"
        width="100"
        height="30"
        alt=""
      />
    </a>
  </nav>
  <VetsSchedule />
</template>

<script>
import VetsSchedule from "./components/VetsSchedule.vue";

export default {
  name: "App",
  components: {
    VetsSchedule,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  background-color: rgb(248 236 222);
}
</style>
