import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const savedUser: Ref<user | null> = ref(null);

  function setNewUser(User: user) {
    savedUser.value = User;
  }

  return {
    savedUser,
    setNewUser,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot));
