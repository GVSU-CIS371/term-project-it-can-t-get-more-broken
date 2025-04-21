import { defineStore } from "pinia";
import { CollectionReference, DocumentReference, addDoc, setDoc, doc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

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
      items:  []
    }),

    actions: {

      // add task to database an items array
      async addTask(name: string, date: Date, description: string) {

         const taskObject = {
            name: name,
            date: date ? Timestamp.fromDate(date) : null,
            description: description || null
         }

         //send this object to the collection
        
         const docRef = await addDoc(collection( db, 'tasks'), taskObject)
         
         //update state and give collection object an ID
         this.items.push({ id: docRef.id, ...taskObject})
      }

      // update task

      // delete task from databse and items array

      //calculate the percentage of tasks completed

    }
  });