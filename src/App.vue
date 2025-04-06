
<template>
  <div id="app" class="my-app">
    <TaskList />
  </div>
</template>



<script setup lang="ts">
import TaskList from './components/TaskList.vue';
</script>



<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
div {
  /* Styles for all divs, or you can narrow it further */
  background-color: #000000;
  padding: 20px;
  border: 2px solid #000000;
  margin: 20px
}
</style>