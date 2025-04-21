import { defineStore } from "pinia";
import { CollectionReference, DocumentReference, addDoc, setDoc, deleteDoc, doc, collection, Timestamp, getDoc, getDocs, Firestore } from "firebase/firestore";
import { db } from "../firebase";
import { id } from "vuetify/locale";

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
    selectedTasks: [];
}

export const useTaskStore = defineStore("TaskStore", {

    state: (): tStore => ({
      colorTheme: "#0091EA",
      darkMode: false,
      completed: 0,
      items:  [],
      selectedTasks: []
    }),

    actions: {
      // get current user tasks
      async getUserTasks(uid) {
        const collectionName = 'tasks';
        const collectionRef = collection(db, collectionName);
        const QS = await getDocs(collectionRef);

        QS.forEach((doc) => {
          if (uid.value == doc.data().uid) {
            this.items.push({ tid: doc.id, ...doc.data()})
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

      //add selected task to list
      async addSelectedTask(id: string) {
        if (!this.selectedTasks.includes(id)) {
          this.selectedTasks.push(id);
        }
      },

      // delete task from databse and items array
      async deleteSelectedTasks() {
        try {
          console.log(this.items)
          for (const docRef of this.selectedTasks) {
            await deleteDoc(doc(db, 'tasks', docRef));
            console.log(docRef)
            console.log(this.items)
            this.items = this.items.filter(task => task.tid != docRef);
            console.log(this.items)
          }
          
          this.selectedTasks.length = 0;
        }
        catch (overallError){
          console.error(overallError);
        }
    }

      //calculate the percentage of tasks completed

    }
  });