<template>
  <v-app>
    <!-- make the name dynamic to the user -->
    <!-- Add color inverter -->
    <v-app-bar style="background: #0091EA"> 
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Hello, Ethan </v-app-bar-title> <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-cog-box" color="black"> Settings </v-btn>
      <v-btn prepend-icon="mdi-account" color="black"> Profile </v-btn>
    </v-app-bar>
    
    <!-- test diplay, to be modded later -->
    <v-navigation-drawer
      v-model="drawer"
      width="400">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Checkbox</v-list-item-title>
              <v-checkbox v-model="isChecked"></v-checkbox>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main
      style="height: 100%;
      text-align: center;
      align-content: center;
      background-color: #B0BEC5
      color: black">
      <span>Main Area</span>
    </v-main>
    <v-footer>

    </v-footer>
      <span>Footer</span>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style scoped>
</style>