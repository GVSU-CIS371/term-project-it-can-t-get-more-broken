<template>
  <v-app>
    <v-main>
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
            @change="taskStore.updatePref(uid);"
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
          width = "400">
          <!-- Add Tasks Button -->
          <v-btn @click="addTaskDialogue = !addTaskDialogue" :color="taskStore.colorTheme" justify="center" style="margin-left: 25px; margin-top: 5%"  >
            Add Task
          </v-btn>

          <!-- Select Tasks Button -->
          <v-btn @click.stop="visibleCheckBox = !visibleCheckBox" :color="taskStore.colorTheme" style="margin-left: 5%; margin-top: 5%" >Select Tasks</v-btn>

          <!-- Large delete button -->
          <v-btn
            justify="center"
            style="margin-left: 5%; margin-top: 5%" 
            icon="mdi-delete" 
            size="small"
            color="#C62828"
            @click="taskStore.deleteSelectedTasks()"></v-btn> 
          <v-list>
            <v-list-item
              v-for="item in taskStore.items"
              :key="item.tid"
              :value="item"
              color="primary"
              @mouseover="isHovered = true"
              @mouseleave="isHovered = false"
              >
              <template v-slot:prepend>
                <!-- <v-icon :icon="item.icon"></v-icon> -->
                <v-checkbox-btn
                  v-if="visibleCheckBox"
                  :key="item.tid"
                  @click="taskStore.addSelectedTask(item.tid)"
                >
                </v-checkbox-btn>
              </template>
              
                <v-list-item-title v-text="item.name"></v-list-item-title>
              <template v-slot:append>
                <v-btn
                  icon="mdi-check"
                  size="small"
                  v-if="isHovered"
                  @click="taskStore.completeTasks(item.tid)"></v-btn>
              </template>
              
              

              </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Main Content Display Area -->
        <v-container
        style="height: 100vh; display: flex; justify-content: center; align-items: center;"
        :style="{backgroundColor: taskStore.darkMode ? '#424242' : '#FFFFFF'}"
        fluid
        >
        <v-col>
          <v-row>
            <v-col style="display: flex; justify-content: center; align-items: center; margin: "
            :style="{backgroundColor: taskStore.darkMode ? '#424242' : '#FFFFFF'}">
            </v-col>
          </v-row>
          <v-row>
            <v-col style="display: flex; justify-content: center; align-items: center;">
              <div>
                <!-- Progress Chart -->
                <v-progress-circular
                  :color="taskStore.colorTheme"
                  :size="512"
                  :width="45"
                  :rotate="360"
                  style="font-size: 36px;"
                  :model-value="taskStore.percentCompleted"
                >
                  <span>{{ taskStore.percentCompleted }}% Tasks Completed</span>
                </v-progress-circular>
              </div>
            </v-col>
              
            <v-divider vertical></v-divider>

            <v-col style="display: flex; justify-content: center; align-items: center;">
                <v-progress-circular
                    :color="taskStore.colorTheme"
                    :size="512"
                    :width="45"
                    :rotate="360"
                    style="font-size: 36px;"
                    :model-value="taskStore.percentCompleted"
                  >
                  <span>{{ taskStore.completedTasks }} Tasks Completed!</span>
                </v-progress-circular>
            </v-col>
          </v-row>
        </v-col>
        </v-container>

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
                    <v-text-field
                      v-model="endDate"
                      variant="outlined"
                      style="margin-left: 10px; margin-right: 50%"
                      clearable
                      label="End Date"
                    ></v-text-field>   
                  </div>
                  <v-dialog v-model="dateSelectDialogue" width="auto">
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { stringify } from 'querystring';

// authentication
const taskStore = useTaskStore();
const user = ref(auth.currentUser);
const uid = ref<string | null>(user.value?.uid || null);

onMounted(() => {
  
  auth.onAuthStateChanged((u) => {
    user.value = u;
    if (u) {
      // If a user exists
      const authInstance = getAuth();
      const email = u.email;
      uid.value = u?.uid;
      const userDocID = taskStore.addNewUser(uid.value)
      taskStore.getUserTasks(uid, userDocID);
      
    } else {
      // User is not logged in, start Firebase UI
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
      ui.start('#firebaseui-auth-container', uiConfig);
      uid.value = null;
    }
  });

  //check userid and get any existing tasks
  
});


//booleans
const taskDrawer = ref(false);
const visibleCheckBox = ref(false);
const addTaskDialogue = ref(false);
const dateSelectDialogue = ref(false);
const isHovered = ref(false);

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

const handleSubmit = async() => {
  if (taskName.value.length >= 1 && uid.value) {
    await taskStore.addTask( uid.value, taskName.value, endDate.value, taskDescription.value)
    taskName.value = '';
    endDate.value = null;
    taskDescription.value = '';
  } else {
    console.log("User not signed in. Cannot add tasks")
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

function newColorTheme(vid) {
  taskStore.colorTheme = vid
  taskStore.updatePref(uid.value)
}

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