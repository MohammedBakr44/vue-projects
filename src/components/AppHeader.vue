<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2 flex"
  >
    <router-link
      class="mx-2"
      v-for="item in list"
      :to="item.to"
      :key="item.to"
      >{{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
    <button v-else class="mx-2" @click="$emit('login-modal-open')">
      Login
    </button>
  </nav>
</template>

<script>
import { auth } from "../utils/firebase.js";
import { signOut } from "firebase/auth";
export default {
  props: {
    isLoggedIn: { type: Boolean, default: false, required: true },
  },
  data() {
    return {
      list: [
        { to: "/dc-heroes", title: "DC Heroes" },
        { to: "/calendar", title: "Calender" },
        { to: "/markdown", title: "Markdown" },
        { to: "/slider", title: "Slider" },
        { to: "/calculator", title: "Calculator" },
        { to: "/modal", title: "Modal" },
        { to: "/chat", title: "Chat" },
        { to: "/crud", title: "CRUD" },
        { to: "/tensorflow", title: "Tensorflow" },
      ],
    };
  },
  methods: {
    logout() {
      signOut(auth);
    },
  },
};
</script>

<style></style>
