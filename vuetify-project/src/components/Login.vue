<!-- src/views/Login.vue or src/components/Login.vue -->
<template>
    <div>
      <h2>Sign In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted } from 'vue';
  import { auth, uiConfig, firebaseui } from '@/firebase';
  
  export default {
    name: 'Login',
    setup() {
      onMounted(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', uiConfig);
      });
    }
  };
  </script>