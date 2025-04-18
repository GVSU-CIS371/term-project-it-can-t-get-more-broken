import { defineStore } from "pinia";

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

export const useTaskStore = defineStore("TaskStore", {
    state: (): tStore => ({
        colorTheme: "#0091EA",
        completed: 0,
        items:  [{
            tId: "t0",
            uId: "u0",
            title: "Task 1",
            description: "This is a test task.\n Beep Boop!",
            date: new Date
        }]
    }),
    actions: {

    }
  });