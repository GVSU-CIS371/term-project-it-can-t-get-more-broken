<template>
  <v-app>
    <v-app-bar style="background: #0091EA"> 
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Hello, Ethan </v-app-bar-title>
      <v-btn prepend-icon="mdi-cog-box" color="black"> Settings </v-btn>
      <v-btn prepend-icon="mdi-account" color="black"> Profile </v-btn>
    </v-app-bar>
    

    <v-navigation-drawer>
      
    </v-navigation-drawer>


    <v-main
      style="height: 100%;
      text-align: center;
      align-content: center;
      background-color: #B0BEC5">
      <span>Main Area</span>
    </v-main>
    <v-footer>

    </v-footer>
      <span>Footer</span>
    </v-app>
</template>

<script lang="ts" setup>
  
</script>

<style scoped>
</style>