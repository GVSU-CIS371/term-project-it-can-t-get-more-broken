import { defineStore } from "pinia";

interface User {
   username: string;
   uid: string;
}

export const createUser = defineStore("currentUser", {
   state: (): User => ({
      username: "User",
      uid: null
   }),
   actions: {

   }
});