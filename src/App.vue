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
      <div class="header-container">  <!-- header component -->
         <HeaderComponent/>
      </div>
      <div class="body-container"> <!-- body component -->
         <TaskList/>
         <div class="divider"/>
         <TaskDisplay/>    
      </div>
   </div>
</template>

<style lang="scss" scoped></style>

