<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-center">Realtime chat</h1>
      <div class="border rounded-lg">
        <div class="h-64 p-2">
          <div
            v-for="chat in state.chats"
            :key="chat.message"
            class="p-2 m-2 rounded text-white overflow-y-scroll"
            :class="
              chat.userId == state.userId
                ? 'text-right bg-blue-800'
                : 'bg-gray-800'
            "
          >
            {{ chat.message }}
          </div>
        </div>
        <div class="h-8 p-2">
          <input
            class="p-1 border rounded shadow"
            placeholder="start typing..."
            v-model="state.message"
            @keydown.enter="addMessage"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import { auth } from "../utils/firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
  onValue,
  push,
  set,
  onChildAdded,
  update,
} from "firebase/database";
const db = getDatabase();
export default {
  setup() {
    const state = reactive({
      chats: {},
      message: "",
      userId: null,
    });
    onMounted(() => {
      const dbRef = ref(db);
      get(child(dbRef, `chats/chat`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            state.chats = snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => console.error(error));
    });
    const realTimeData = ref(db, "chats");
    onValue(realTimeData, (snapshot) => {
      state.userId = auth.currentUser.uid;
      state.chats = snapshot.val();
    });

    const chatRef = ref(db);

    const addMessage = () => {
      const updates = {};
      const newMessageKey = push(child(chatRef, "chats")).key;

      updates[`chats/${newMessageKey}`] = {
        message: state.message,
        userId: state.userId,
      };
      state.message = "";
      return update(chatRef, updates);
    };
    return { state, addMessage };
  },
};
</script>

<style></style>
