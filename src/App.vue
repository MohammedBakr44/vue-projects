<template>
  <AppHeader :isLoggedIn="isLoggedIn" @login-modal-open="setLoginOpen(true)" />
  <div class="flex justify-center items-center">
    <router-view> </router-view>
    <teleport to="body">
      <LoginModal @close-login-modal="setLoginOpen(false)" v-if="isLoginOpen" />
    </teleport>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LoginModal from "./components/LoginModal.vue";
import { auth } from "./utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { storeToRefs } from "pinia";
import { loginState } from "./store/index.js";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const store = loginState();
    const { isLoggedIn, authUser, isLoginOpen } = storeToRefs(store);
    const { setIsLoggedIn, setAuthUser, setLoginOpen } = store;

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          setAuthUser(user);
        } else {
          setIsLoggedIn(false);
          setAuthUser({});
        }
      });
    });

    return { isLoggedIn, authUser, isLoginOpen, isLoginOpen, setLoginOpen };
  },
  components: { AppHeader, LoginModal },
};
</script>

<style></style>
