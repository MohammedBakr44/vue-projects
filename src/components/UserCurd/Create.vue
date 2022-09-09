<template>
  <button
    class="px-2 py-1 border rounded my-4"
    @click="state.isModalOpen = true"
  >
    Add User
  </button>
  <teleport to="body">
    <Modal @close="state.isModalOpen = false" v-if="state.isModalOpen">
      <template #title> Add new User </template>
      <template #body>
        <form @submit.prevent="submit">
          <div class="p-2">
            <label>Name</label>
            <input
              v-model="state.form.name"
              class="w-full p-2 rounded border"
              placeholder="Last Name"
            />
          </div>
          <div class="p-2">
            <label>Email</label>
            <input
              v-model="state.form.email"
              class="w-full p-2 rounded border"
              placeholder="User email"
              type="email"
            />
          </div>
          <div class="p-2">
            <label>Avatar</label>
            <input
              v-model="state.form.avatar"
              class="w-full p-2 rounded border"
              placeholder="Avatar URL"
            />
          </div>
          <div class="p-2">
            <input
              type="submit"
              value="create"
              class="w-full p-2 rounded border bg-gray-300 hover:bg-gray-500 cursor-pointer"
            />
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import { reactive } from "vue";
import Modal from "../Modal.vue";
import axios from "axios";
axios.defaults.baseURL =
  "https://crudcrud.com/api/70b7a7b768ff47ac8c790252484315b3";
export default {
  components: { Modal },
  setup(_, { emit }) {
    const state = reactive({
      isModalOpen: false,
      form: {
        name: "",
        email: "",
        avatar: "",
      },
    });
    const submit = async () => {
      const { data } = await axios.post("/users", state.form);
      emit("new-user-added", data);
      state.form.first_name = "";
      state.form.last_name = "";
      state.form.email = "";
      state.form.avatar = "";
      state.isModalOpen = false;
    };
    return { state, submit };
  },
};
</script>

<style></style>
