<template>
  <v-app>
    <!-- make the name dynamic to the user -->
    <!-- Add color inverter -->
    <v-app-bar :color="colorTheme"> 
      <v-app-bar-nav-icon @click.stop="taskDrawer = !taskDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Hello, Ethan </v-app-bar-title> <v-spacer></v-spacer>


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
      <v-btn @click="addTaskDialogue = !addTaskDialogue" :color="colorTheme" justify="center" style="margin-left: 65px; margin-top: 5%"  >
        Add Task
      </v-btn>

      <!-- Select Tasks Button -->
      <v-btn @click.stop="visibleCheckBox = !visibleCheckBox" :color="colorTheme" style="margin-left: 5%; margin-top: 5%" >Select Tasks</v-btn>
      <v-list>
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
          <v-list-item-title v-text="item.text"></v-list-item-title>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Display Area -->
    <v-main class="d-flex align-center justify-center" style="background-color: white">

      <!-- Progress Chart -->
      <v-progress-circular
        :color="colorTheme"
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
          <v-btn @click="dateSelectDialogue = !dateSelectDialogue" :color="colorTheme" style="margin: 10px">
            Select End Date
          </v-btn>
          <v-text-feild variant="outlined">{{ endDate }}</v-text-feild>
        </div>
        <v-dialog v-model="dateSelectDialogue" width="auto">
          <v-date-picker :color="colorTheme" v-model="endDate" @input="dateSelectDialogue = false"></v-date-picker>
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
          <v-btn @click="addTaskDialogue = !addTaskDialogue" :color="colorTheme">Cancel</v-btn>
          <v-btn :color="colorTheme">Add Task</v-btn>
        </v-row>

        </v-card>
      </v-dialog>
    </div>

  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const taskDrawer = ref(false);
const visibleCheckBox = ref(false);
const addTaskDialogue = ref(false);
const dateSelectDialogue = ref(false);
const colorTheme = "#0091EA";
const completed = 0;

const colorThemes = [ 
  {name: "Red", vid: "#E53935"},
  {name: "Blue", vid: "#0091EA"},
  {name: "Pink", vid: "#D81B60"},
  {name: "Purple", vid: "#8E24AA"},
  {name: "Teal", vid: "#26A69A"},
  {name: "Green", vid: "#64DD17"}
]

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

const totalProgress = computed(() => {
  return (this.completed / this.items.length)
})

function newColorTheme(newColor) {
  this.colorTheme = newColor;
};

</script>

<style scoped>
</style>