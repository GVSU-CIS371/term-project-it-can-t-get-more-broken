<script>
   import TaskList from "./components/TaskList.vue";
   import TaskDisplay from "./components/TaskDisplay.vue";
   import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
   <div id="app">
      <div>
         <HeaderComponent/>
      </div>
      <div>
         <TaskList/>
         <TaskDisplay/>
      </div>
   </div>
</template>

<style lang="css" scoped>
#app {
   /* basic styling to outling app component */
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   background-color: lightblue;
   margin: 0px;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
}
</style>

