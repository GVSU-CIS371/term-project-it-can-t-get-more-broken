<template>
  <v-app>
    <v-main >
      <div v-if="!user">
        <h2 style="text-align: center;">Please sign in</h2>
        <div id="firebaseui-auth-container"></div>
      </div>

      <div v-else>
        <!-- Add color inverter -->
        <v-app-bar :color="taskStore.colorTheme"> 
          <v-app-bar-nav-icon @click.stop="taskDrawer = !taskDrawer"></v-app-bar-nav-icon>
          <v-app-bar-title :style="{ color: taskStore.darkMode ? 'black' : 'white' }">Hello, {{ user.displayName || user.email }}</v-app-bar-title>
            <v-switch 
            v-model="taskStore.darkMode" 
            :label="'Dark Mode' "
            :color="taskStore.darkMode ? 'black' : 'white'"
            :label-color="taskStore.darkMode ? 'white' : 'black'"
            style="margin-top: 20px; margin-right:20px;">
          </v-switch>

          <!-- Settings Button -->
          <v-btn :color="taskStore.darkMode ? 'black' : 'white'" prepend-icon="mdi-cog-box">
            Settings
            <v-menu
              activator="parent"
              transition="slide-y-transition">
              <v-list style="height: auto; width: 200px; text-align: left; padding-left:17%"
              >
              Select Color Theme

                <v-list-item
                  v-for="(color, i) in colorThemes"
                  :key="i"
                  @click="newColorTheme(color.vid);"
                >
                  <v-icon
                    icon="mdi-circle"
                    :color="color.vid"
                  ></v-icon>
                 
                  {{ color.name }}
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>

          <!-- Profile Button -->
          <v-btn prepend-icon="mdi-account" :color="taskStore.darkMode ? 'black' : 'white'" style="margin-right: 2.5%">
            Profile
            <v-menu
              activator="parent"
              transition="slide-y-transition"
            >
            <v-list style="height: auto; width: 200px; text-align: center">
              <v-btn @click="signOut">Sign Out</v-btn>
            </v-list>
            </v-menu>
          </v-btn>
        </v-app-bar>
            
        <!-- Navigation Bar -->
        <v-navigation-drawer
          v-model="taskDrawer"
          width="400">

          <!-- Add Tasks Button -->
          <v-btn @click="addTaskDialogue = !addTaskDialogue" :color="taskStore.colorTheme" justify="center" style="margin-left: 65px; margin-top: 5%"  >
            Add Task
          </v-btn>

          <!-- Select Tasks Button -->
          <v-btn @click.stop="visibleCheckBox = !visibleCheckBox" :color="taskStore.colorTheme" style="margin-left: 5%; margin-top: 5%" >Select Tasks</v-btn>
          <v-list>
            <v-list-item
              v-for="item in taskStore.items"
              :key="item.tid"
              :value="item"
              color="primary"
              >
              <template v-slot:prepend>
                <!-- <v-icon :icon="item.icon"></v-icon> -->
                <v-checkbox-btn
                  v-if="visibleCheckBox">
                </v-checkbox-btn>
              </template>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Main Content Display Area -->
        <v-main
        class="d-flex justify-center"
        v-model="taskStore.darkMode"
        style="height: 100vh; width: auto;"
        :style="{backgroundColor: taskStore.darkMode ? '#424242' : '#FFFFFF'}"
        >

          <!-- Progress Chart -->
          <v-progress-circular
            :color="taskStore.colorTheme"
            :size="512"
            :width="72"
            :rotate="360"
            style="font-size: 36px;"
            model-value="totalProgress"
          >
            <span>{{ totalProgress }} %</span>
          </v-progress-circular>
        </v-main>

        <!-- Add Task Button Dialogue Window -->
        <div>
          <v-dialog
            v-model="addTaskDialogue"
            width="1000">
            <v-card
              prepend-icon="mdi-calendar-check"
              title="Add a New Task" 
            >
              <v-divider style="margin: 10px"></v-divider>
                <v-form 
                  fast-fail
                  @submit.prevent="handleSubmit"
                >
                  <!-- Title -->
                  <v-text-field
                    v-model="taskName"
                    label="Task Name" 
                    variant="outlined" 
                    style="margin-left: 10px; margin-top: 10px; margin-right: 40%;"
                    clearable
                    :rules="nameRules"
                  ></v-text-field>

                  <!-- Select Date -->
                  <div>
                    <v-btn @click="dateSelectDialogue = !dateSelectDialogue" :color="taskStore.colorTheme" style="margin: 10px">
                      Select End Date
                    </v-btn>
                    <!-- FIXME: attach it to something else -->
                    <v-text-field
                      v-model="endDate"
                      variant="outlined"
                      style="margin-left: 10px; margin-right: 50%"
                      clearable
                      label="End Date"
                    ></v-text-field>   
                  </div>
                  <v-dialog v-model="dateSelectDialogue" width="auto">
                    <!-- FIXME: attach it to something else -->
                    <v-date-picker :color="taskStore.colorTheme" v-model="endDate" @input="dateSelectDialogue = false"></v-date-picker>
                  </v-dialog>

                  <!-- Description -->
                  <v-textarea
                    v-model="taskDescription"
                    label="Description" 
                    variant="outlined" 
                    style="margin-left: 10px; margin-right: 10px; height: 40%"
                    clearable
                  >
                  </v-textarea>

                <!-- Action Buttons -->
                <v-row justify="space-between" style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px">
                  <v-btn @click="addTaskDialogue = !addTaskDialogue" :color="taskStore.colorTheme">Cancel</v-btn>
                  <v-btn type="submit" :color="taskStore.colorTheme">Add Task</v-btn>
                </v-row>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
// imports
import { ref, computed, onMounted } from 'vue';
import { useTaskStore, createUser } from "./stores/tasks";
import { auth, uiConfig, firebaseui } from './firebase'; 
import { getAuth } from 'firebase/auth';
import { NULL } from 'sass-embedded';

// authentication
const taskStore = useTaskStore();
const user = ref(auth.currentUser);

onMounted(() => {
  auth.onAuthStateChanged((u) => {
    user.value = u;
    if (u) {
      // If a user exists
      const authInstance = getAuth();
      const email = u.email;
    } else {
      // User is not logged in, start Firebase UI
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
});

//booleans
const taskDrawer = ref(false);
const visibleCheckBox = ref(false);
const addTaskDialogue = ref(false);
const dateSelectDialogue = ref(false);

//v-model values
const taskName = ref<string >('');
const endDate = ref< Date | null >(null);
const taskDescription = ref<string>('');

const colorThemes = [ 
  {name: "Red", vid: "#E53935"},
  {name: "Blue", vid: "#0091EA"},
  {name: "Pink", vid: "#D81B60"},
  {name: "Purple", vid: "#8E24AA"},
  {name: "Teal", vid: "#26A69A"},
  {name: "Green", vid: "#64DD17"}
]

const totalProgress = computed(() => {
  return (taskStore.completed / taskStore.items.length)
})

const handleSubmit = async() => {
  if (taskName.value.length >= 1) {
    await taskStore.addTask( taskName.value, endDate.value, taskDescription.value)
    taskName.value = '';
    endDate.value = null;
    taskDescription.value = '';
  }
}

const nameRules = [
  value => {
    if (value?.length < 1) {
      return 'Task must have a name'
    }
    else {
      return true;
    }
  }
];

function newColorTheme(newColor) {
  taskStore.colorTheme = newColor;
};

function signOut() {
  auth.signOut();
  user.value = null;
}
</script>

<style scoped>
.v-switch label {
  color: "taskStore.darkMode ? 'black' : 'white'"
}
</style>