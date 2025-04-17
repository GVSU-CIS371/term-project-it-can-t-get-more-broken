<template>
  <v-app>
    <!-- make the name dynamic to the user -->
    <!-- Add color inverter -->
    <v-app-bar style="background: #0091EA"> 
      <v-app-bar-nav-icon @click.stop="taskDrawer = !taskDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Hello, Ethan </v-app-bar-title> <v-spacer></v-spacer>

      <v-btn prepend-icon="mdi-cog-box" color="black"> 
        Settings
        <v-menu
          activator="parent"
          transition="slide-x-transition"
        >
        <v-list style="height: 600px; width: 300px"></v-list>
        </v-menu>
      </v-btn>


      <v-btn prepend-icon="mdi-account" color="black">
        Profile
        <v-menu
          activator="parent"
          transition="slide-x-transition"
        >
        <v-list style="height: 600px; width: 300px"></v-list>
        </v-menu>
      </v-btn>
    </v-app-bar>
      
    <!-- Navigation Bar -->
    <v-navigation-drawer
      v-model="taskDrawer"
      width="400">
      <!-- add tasks -->
      <v-btn @click="addTaskDialogue = !addTaskDialogue" >
        Add Task
      </v-btn>

      <!-- make the checkboxes visible and render the tasks -->
      <v-btn @click.stop="visibleCheckBox = !visibleCheckBox">Select Tasks</v-btn>
      <v-list>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          >
          <template v-slot:prepend>
            <!-- <v-icon :icon="item.icon"></v-icon> -->
            <v-checkbox-btn
              v-if="visibleCheckBox">
            </v-checkbox-btn>

          </template>
          <v-divider></v-divider>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      style="height: 100%;
      text-align: center;
      align-content: center;
      background-color: white;
      color: black;">
      <span>Main Area</span>
    </v-main>

    <!-- Button Components -->
    <div>
      <v-dialog
        v-model="addTaskDialogue"
        width="1000">
        <v-card
          prepend-icon="mdi-calendar-check"
          title="Add a New Task" 
        >
        <v-divider style="margin: 10px"></v-divider>

        <v-text-field
         label="Title" 
         variant="outlined" 
         style="margin-left: 10px; margin-top: 10px; margin-right: 40%;"
        ></v-text-field>

        <div style="">
          <v-btn @click="dateSelectDialogue = !dateSelectDialogue" style="background-color: #0091EA; margin: 10px">
            Select End Date
          </v-btn>
        </div>

        <v-textarea
         label="Description" 
         variant="outlined" 
         style="margin-left: 10px; margin-right: 10px; height: 40%"
         >
         </v-textarea>

        <v-row justify="space-between" style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px">
          <v-btn @click="addTaskDialogue = !addTaskDialogue" style="background-color: #0091EA">Cancel</v-btn>
          <v-btn style="background-color: #0091EA">Add Task</v-btn>
        </v-row>

        </v-card>
      </v-dialog>
    </div>

  </v-app>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const taskDrawer = ref(false);
const visibleCheckBox = ref(false);
const addTaskDialogue = ref(false);
const dateSelectDialogue = ref(false);

const items = [
  { text: 'Task1', description: 'mdi-clock' },
  { text: 'Task2', icon: 'mdi-clock' },
  { text: 'Task3', icon: 'mdi-clock' },
  { text: 'Task4', icon: 'mdi-clock' },
  { text: 'Task5', icon: 'mdi-clock' },
  { text: 'Task6', icon: 'mdi-clock' },
  { text: 'Task7', icon: 'mdi-clock' },
  { text: 'Task8', icon: 'mdi-clock' },
  { text: 'Task9', icon: 'mdi-clock' },
  { text: 'Task10', icon: 'mdi-clock' },
]

</script>

<style scoped>
</style>