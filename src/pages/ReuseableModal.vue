<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="2xl my-5">Reuseable Modal</h1>
      <Modal v-if="isRedModalOpen" @close="isRedModalOpen = false">
        <template #title>
          <h1 class="text-red-500">Red Modal</h1>
        </template>
      </Modal>
      <button
        class="border rounded bg-blue-500 px-2 mx-4 text-white"
        @click="isRedModalOpen = true"
      >
        Open Red Modal
      </button>

      <Modal v-if="isBlueModalOpen" @close="isBlueModalOpen = false"></Modal>
      <button
        class="border rounded bg-blue-500 px-2 mx-4 text-white"
        @click="isBlueModalOpen = true"
      >
        Open Blue Modal
      </button>
    </div>
  </section>
</template>

<script>
import Modal from "../components/Modal.vue";
import { ref } from "vue";
export default {
  setup() {
    const isRedModalOpen = ref(false);
    const isBlueModalOpen = ref(false);
    return { isRedModalOpen, isBlueModalOpen };
  },
  components: { Modal },
};
</script>

<style></style>
