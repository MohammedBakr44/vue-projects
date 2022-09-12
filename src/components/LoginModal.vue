<template>
  <section
    @click="close"
    class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
        <div class="p-2 border">
          <h1 class="text-xl text-center">Login</h1>
          <GoogleLogin @close-login-from-google="close" />
          <p class="my-2 text-center">or</p>
          <form class="p-2 my-2" @submit.prevent="submit">
            <div class="my-4">
              <label>Email or Username</label>
              <input
                placeholder="Enter your email or username"
                class="rounded shadow p-2 w-full"
                v-model="form.userName"
                ref="emailModalRef"
              />
            </div>
            <div class="my-4">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                type="password"
                class="rounded shadow p-2 w-full"
                v-model="form.password"
              />
            </div>
            <div class="my-4">
              <button
                type="submit"
                class="p-2 w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-600 text-white"
              >
                <span v-if="!isLoading">Login</span>
                <span v-else>⏳</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import GoogleLogin from "./login/GoogleLogin.vue";

export default {
  components: { GoogleLogin },
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    close() {
      this.$emit("close-login-modal");
    },
    submit() {
      this.isLoading = true;
      signInWithEmailAndPassword(auth, this.form.userName, this.form.password)
        .then(() => {
          this.form.userName = "";
          this.form.password = "";
          this.isLoading = false;
          this.close();
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.$refs.emailModalRef.focus();
  },
};
</script>

<style></style>
