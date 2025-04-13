<template>
  <div class="TaskList">
    <h2>Task List</h2>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.TaskList {
  position: fixed;
  left: 0;
  width: 30%;
  height: 70%;
  background-color: #ffffff;
  padding: 00px;
  box-shadow: 10px 0 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  border-radius: 15px;
  bottom: 0;
}
h2 {
  margin-top: 0;
  border-bottom: 5px solid #000000;
}
h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: #333;
}
</style>
