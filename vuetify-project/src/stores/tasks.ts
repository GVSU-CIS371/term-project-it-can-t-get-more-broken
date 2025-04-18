import { defineStore } from "pinia";
import { ref } from "vue";

const colorThemes = [
    {name: "Red", vid: "#E53935"},
    {name: "Blue", vid: "#0091EA"},
    {name: "Pink", vid: "#D81B60"},
    {name: "Purple", vid: "#8E24AA"},
    {name: "Teal", vid: "#26A69A"},
    {name: "Green", vid: "#64DD17"}
]

interface Task {
    tId: string;
    uId: string;
    title: string;
    description: string;
    date: Date;
};

interface tStore {
    colorTheme: string;
    completed: number;
    items: Task[];
}

export const tasks = defineStore("TaskStore", {
    state: (): tStore => ({
        colorTheme: "#0091EA",
        completed: 0,
        items:  new Array<Task>
    }),
    actions: {

    }
  });