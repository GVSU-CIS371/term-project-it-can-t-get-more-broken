import { defineStore } from "pinia";
import { CollectionReference, DocumentReference, addDoc, setDoc, deleteDoc, doc, collection, Timestamp, getDoc, getDocs, Firestore } from "firebase/firestore";
import { db } from "../firebase";

interface Task {
    tid: string;
    uid: string;
    name: string;
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
      // get current user tasks
      async getUserTasks(uid) {
        const collectionName = 'tasks';
        const collectionRef = collection(db, collectionName);
        const QS = await getDocs(collectionRef);



        QS.forEach((doc) => {
          if (uid.value == doc.data().uid) {
            this.items.push({ id: doc.id, ...doc.data()})
          }
        })
      },

      // add task to database an items array
      async addTask(uid: string, name: string, date: Date, description: string) {

         const taskObject = {
            uid: uid ? uid : null,
            name: name,
            date: date ? Timestamp.fromDate(date) : null,
            description: description || null
         }
         const docRef = await addDoc(collection( db, 'tasks'), taskObject)
         this.items.push({ tid: docRef.id, ...taskObject})
      },

      // delete task from databse and items array
      

      //calculate the percentage of tasks completed

    }
  });