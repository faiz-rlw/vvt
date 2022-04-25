import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  let name = "hellow pinia"
  
  const setName = (newName:string) => {
    name = newName
  }

  return {
    name,
    setName,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
