<template>
  <Demo @hello="showHelloMsg" msg="你好啊" school="开放Vue3">
    <template v-slot:qwe>
      <span>开放vue3</span>
    </template>
    <template v-slot:asd>
      <span>开放Vue3</span>
    </template>
  </Demo>
</template>

<script>
import Demo from "./components/Demo";
export default {
  name: "App",
  components: { Demo },
  setup() {
    function showHelloMsg(value) {
      alert(`你好啊，你触发了hello事件，我收到的参数是:${value}！`);
    }
    return {
      showHelloMsg,
    };
  },
};
</script>

