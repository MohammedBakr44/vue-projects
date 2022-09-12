<template>
  <section class="flex w-full">
    <div class="m-auto">
      <Create @new-user-added="addUser" />
      <table class="mt-10">
        <thead>
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Avatar</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in state.users" :key="user.id">
            <td class="border px-4 py-2">{{ user._id }}</td>
            <td class="border px-4 py-2">
              <img width="50" class="rounded-full" :src="user.avatar" />
            </td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">
              <button
                @click="remove(user._id)"
                class="px-2 py-1 bg-red-800 rounded text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between mt-2">
        <button
          class="px-3 py-2 border rounded"
          @click="prev"
          :disabled="state.users.page == 1"
          :class="state.users.page == 1 ? 'bg-gray-100' : 'hover:shadow'"
        >
          Prev
        </button>
        <button
          class="px-3 py-2 border rounded"
          @click="next"
          :disabled="state.users.page == state.users.total_pages"
          :class="
            state.users.page == state.users.total_pages
              ? 'bg-gray-100'
              : 'hover:shadow'
          "
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
import Create from "../components/UserCurd/Create.vue";
axios.defaults.baseURL =
  "https://crudcrud.com/api/2b6f189291204f1297b1eac619411fa9";
export default {
  components: { Create },
  setup() {
    const state = reactive({
      users: [],
    });

    const remove = async (id) => {
      await axios.delete(`/users/${id}`);
      state.users = state.users.filter((user) => user._id !== id);
    };
    onMounted(async () => {
      const { data } = await axios.get("/users");
      state.users = data;
    });
    const next = async () => {
      const { data } = await axios.get("/users?page=2");
      state.users = data;
    };
    const prev = async () => {
      const { data } = await axios.get("/users");
      state.users = data;
    };

    const addUser = (data) => {
      state.users.push(data);
    };
    return { state, next, prev, remove, addUser };
  },
};
</script>

<style></style>
