<template>
  <v-app>
    <!-- make the name dynamic to the user -->
    <!-- Add color inverter -->
    <v-app-bar :color="taskStore.colorTheme"> 
      <v-app-bar-nav-icon @click.stop="taskDrawer = !taskDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Hello, Ethan </v-app-bar-title> <v-spacer></v-spacer>

      <v-switch 
        v-model="taskStore.darkMode" 
        :label="'Dark Mode'"
        style="margin-top: 20px; margin-right:20px"
        @click="taskStore.darkMode = !taskStore.darkMode">
      </v-switch>

      <!-- Settings Button -->
      <v-btn prepend-icon="mdi-cog-box" color="black"> 
        Settings
        <v-menu
          activator="parent"
          transition="slide-y-transition">
          <v-list style="height: auto; width: 200px; text-align: center;"
          >
          Select Color Theme

            <v-list-item
              v-for="(color, i) in colorThemes"
              :key="i"
              @click="newColorTheme(color.vid);"
            >
            {{ color.name }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <!-- Profile Button -->
      <v-btn prepend-icon="mdi-account" color="black" style="margin-right: 2.5%">
        Profile
        <v-menu
          activator="parent"
          transition="slide-y-transition"
        >
        <v-list style="height: auto; width: 200px"></v-list>
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
          :key="item.tId"
          :value="item"
          color="primary"
          >
          <template v-slot:prepend>
            <!-- <v-icon :icon="item.icon"></v-icon> -->
            <v-checkbox-btn
              v-if="visibleCheckBox">
            </v-checkbox-btn>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Display Area -->
    <v-main
     class="d-flex align-center justify-center"
     v-model="taskStore.darkMode"
     :style="{backgroundColor: taskStore.darkMode ? '#424242' : '#FFFFFF' }"
    >

      <!-- Progress Chart -->
      <v-progress-circular
        :color="taskStore.colorTheme"
        :size="512"
        :width="72"
        :rotate="360"
        justify="center"
        style="font-size: 36px;"
        model-value="totalProgress"
      >
        <span>{{ totalProgress }} %</span>
      </v-progress-circular>
      <!-- <v-sparkline
      :auto-line-width="autoLineWidth"
      :fill="fill"
      :gradient="gradient"
      :gradient-direction="gradientDirection"
      :line-width="width"
      :model-value="totalProgress"
      :padding="padding"
      :smooth="radius || false"
      :stroke-linecap="lineCap"
      :type="type"
      auto-draw></v-sparkline> -->

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

        <!-- Title -->
        <v-text-field
         label="Title" 
         variant="outlined" 
         style="margin-left: 10px; margin-top: 10px; margin-right: 40%;"
        ></v-text-field>

        <!-- Select Date -->
        <div>
          <v-btn @click="dateSelectDialogue = !dateSelectDialogue" :color="taskStore.colorTheme" style="margin: 10px">
            Select End Date
          </v-btn>
          <!-- FIXME: attach it to something else -->
          <v-text-feild variant="outlined">{{ endDate }}</v-text-feild>
        </div>
        <v-dialog v-model="dateSelectDialogue" width="auto">
          <!-- FIXME: attach it to something else -->
          <v-date-picker :color="taskStore.colorTheme" v-model="endDate" @input="dateSelectDialogue = false"></v-date-picker>
        </v-dialog>

        <!-- Description -->
        <v-textarea
         label="Description" 
         variant="outlined" 
         style="margin-left: 10px; margin-right: 10px; height: 40%"
         >
         </v-textarea>

        <!-- Action Buttons -->
        <v-row justify="space-between" style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px">
          <v-btn @click="addTaskDialogue = !addTaskDialogue" :color="taskStore.colorTheme">Cancel</v-btn>
          <v-btn :color="taskStore.colorTheme">Add Task</v-btn>
        </v-row>

        </v-card>
      </v-dialog>
    </div>

  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useTaskStore } from "./stores/tasks";
import { createUser } from "./stores/user";

const taskStore = useTaskStore();
const user = createUser();

const taskDrawer = ref(false);
const visibleCheckBox = ref(false);
const addTaskDialogue = ref(false);
const dateSelectDialogue = ref(false);

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

function newColorTheme(newColor) {
  this.colorTheme = newColor;
  taskStore.colorTheme = newColor;
};


</script>

<style scoped>
</style>