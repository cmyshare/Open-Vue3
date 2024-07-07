<template>
  <title>01_分析工程结构</title>
  <!-- Vue3组件中的模板结构可以没有根标签 -->
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <ReadMdVersion />
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ReadMdVersion from "./components/ReadMdVersion.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    ReadMdVersion
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
  margin-top: 60px;
}
</style>
