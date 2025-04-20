import { defineStore } from "pinia";

interface User {
   username: string;
   id: string;
}

export const createUser = defineStore("currentUser", {
   state: (): User => ({
      username: "User",
      id: null
   }),
   actions: {

   }
});