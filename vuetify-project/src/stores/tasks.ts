import { defineStore } from "pinia";
import { CollectionReference, DocumentReference, addDoc, setDoc, deleteDoc, doc, collection, Timestamp, getDoc, getDocs, Firestore } from "firebase/firestore";
import { db } from "../firebase";
import { id } from "vuetify/locale";

interface User {
    uid: string;
    colorTheme: string;
    darkMode: boolean;
    completedTasks: number;
    undeletedItems: Task[],
}

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
    completedTasks: number;
    percentCompleted: number;
    items: Task[];
    undeletedItems: Task[],
    selectedTasks: string[];
}

export const useTaskStore = defineStore("TaskStore", {

    state: (): tStore => ({
      colorTheme: "#0091EA",
      darkMode: true,
      completedTasks: 0,
      percentCompleted: 100,
      items:  [],
      undeletedItems: [],
      selectedTasks: []
    }),

    actions: {

      // add user profile if new
      async addNewUser(uid: string) {
        const collectionName = 'users';
        const CollectionReference = collection(db, collectionName);
        const QS = await getDocs(CollectionReference);
        let existingUser = false;

        console.log(uid + " in function")

        QS.forEach((doc) => {
          const docData = doc.data();
          if (docData.uid === uid) {
            existingUser = true;
            this.colorTheme = docData.colorTheme;
            this.darkMode = docData.darkMode;
            this.completedTasks = docData.completedTasks;
            this.undeletedItems = docData.undeletedItems;
          }
        });
          
          if (!existingUser && uid != null) {
            //set new defaults
            const userObject = {
              uid: uid ? uid : null,
              colorTheme: "#0091EA",
              darkMode: true,
              completedTasks: 0,
              undeletedItems: []
            };

            const userDocRef = await addDoc(collection( db, 'users'), userObject);
            return userDocRef;
          }
      },

      // get current user tasks
      async getUserTasks(uid, userDocID: string) {

        // get user settings
        const userDocRef = doc(db, 'users', userDocID);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          this.colorTheme = userData.colorTheme;
          this.darkMode = userData.darkMode;
          this.completedTasks = userData.completedTasks;
          this.undeletedItems = userData.undeletedItems;
        }


        let collectionName = 'tasks';
        const collectionRef = collection(db, collectionName);
        const QS = await getDocs(collectionRef);

        QS.forEach((doc) => {
          if (uid.value == doc.data().uid) {
            this.items.push({ tid: doc.id, ...doc.data()})
            this.undeletedItems.push({ tid: doc.id, ...doc.data()})
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
         };
         const docRef = await addDoc(collection( db, 'tasks'), taskObject);
         this.items.push({ tid: docRef.id, ...taskObject});
         this.undeletedItems.push({ tid: docRef.id, ...taskObject});
      },

      // add selected task to list
      async addSelectedTask(tid: string) {
        if (!this.selectedTasks.includes(tid)) {
          this.selectedTasks.push(tid);
        }
        else {
          this.selectedTasks = this.selectedTasks.filter(docRef => docRef != tid);
        }
      },

      // delete task from databse and items array
      async deleteSelectedTasks() {
        try {
          for (const docRef of this.selectedTasks) {
            await deleteDoc(doc(db, 'tasks', docRef));
            this.items = this.items.filter(task => task.tid != docRef);
            this.undeletedItems = this.undeletedItems.filter(task => task.tid != docRef);
          }
          
          this.selectedTasks.length = 0;
        }
        catch (overallError){
          console.error(overallError);
        }
      },

      // calculate number of tasks completed
      async completeTasks(docRef) {
        await deleteDoc(doc(db, 'tasks', docRef));
        this.completedTasks++;
        this.items = this.items.filter(task => task.tid != docRef);
        this.calcPercentCompleted();
      },

      // calculate percentage of tasks completed
      async calcPercentCompleted() {
        if (this.undeletedItems.length > 0) {
          this.percentCompleted = Math.ceil((this.completedTasks / this.undeletedItems.length) * 100);
        }
      },

      // update visual preferences
      async updatePref(uid: string) {
        const collectionName = 'users';
        const CollectionReference = collection(db, collectionName);
        const QS = await getDocs(CollectionReference);

        QS.forEach((docQ) => {
          const docData = docQ.data();
          if (docData.uid === uid) {
            setDoc(doc(db, "users", uid), {
              colorTheme: this.colorTheme,
              completedTasks: docData.completedTasks,
              darkMode: this.darkMode,
              uid: docData.uid,
              undeletedItems: docData.undeletedItems
            })
          }
        });
      }
  }});