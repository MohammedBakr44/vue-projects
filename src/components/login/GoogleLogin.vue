<template>
  <section class="text-center my-5">
    <button class="px-2 rounded border" @click="loginWithGoogle">
      Login with Google
    </button>
  </section>
</template>

<script>
import { auth } from "../../utils/firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
export default {
  methods: {
    loginWithGoogle() {
      signInWithPopup(auth, provider).then((res) => this.$emit('close-login-from-google'));
    },
  },
};
</script>

<style></style>
