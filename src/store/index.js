import { defineStore } from "pinia";
import { ref } from "vue";

export const loginState = defineStore("login", () => {
  const isLoggedIn = ref(false);
  const authUser = ref({});
  const isLoginOpen = ref(false);
  const setIsLoggedIn = (val) => (isLoggedIn.value = val);
  const setAuthUser = (payload) => (authUser.value = payload);
  const setLoginOpen = (payload) => (isLoginOpen.value = payload);
  return {
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    setAuthUser,
    isLoginOpen,
    setLoginOpen,
  };
});
