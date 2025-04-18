import { defineStore } from "pinia";

interface Task {
    tid: string;
    uid: string;
    title: string;
    description: string;
    date: Date;
};

interface tStore {
    colorTheme: string;
    darkMode: boolean;
    completed: number;
    items: Task[];
}

export const useTaskStore = defineStore("TaskStore", {
    state: (): tStore => ({
        colorTheme: "#0091EA",
        darkMode: false,
        completed: 0,
        items:  [{
            tid: "t0",
            uid: "u0",
            title: "Task 1",
            description: "This is a test task.\n Beep Boop!",
            date: new Date
        }]
    }),
    actions: {

    }
  });