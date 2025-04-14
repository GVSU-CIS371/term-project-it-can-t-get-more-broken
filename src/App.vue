<script>
   import TaskList from "./components/TaskList.vue";
   import TaskDisplay from "./components/TaskDisplay.vue";
   import HeaderComponent from "./components/HeaderComponent.vue";

   export default {
    name: 'App',
    components: {
        HeaderComponent,
        TaskList,
        TaskDisplay,
    },
   };

</script>

<template>
   <div id="app">
      <div class="body-template">
         <div class="body-upper">
            <HeaderComponent/>
         </div>
         <div class="body-lower">
            <TaskList/>
            <TaskDisplay/>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped></style>

