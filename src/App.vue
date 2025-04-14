<script>
   import TaskList from "./components/TaskList.vue";
   import TaskDisplay from "./components/TaskDisplay.vue";
   import HeaderComponent from "./components/HeaderComponent.vue";

   export default {
    name: 'App',
    components: {
        HeaderComponent,
      //   TaskList,
        TaskDisplay,
    },
   };

</script>

<template>
   <div id="app">
      <HeaderComponent/>
      <TaskList/>
      <TaskDisplay/>
   </div>
</template>

<style lang="scss" scoped></style>

