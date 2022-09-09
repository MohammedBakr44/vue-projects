<template>
  <section
    class="z-20 h-screen w-screen fixed top-0 left-0"
    style="background-color: rgba(161, 166, 173, 0.5)"
  >
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
          <div class="p-2 border">
            <div class="text-right">
              <button @click="close">X</button>
            </div>
            <h1 class="text-2xl">
              <slot name="title">Provide some data</slot>
            </h1>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
};
</script>

<style></style>
