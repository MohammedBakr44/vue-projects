<template>
  <div class="flex flex-wrap w-full">
    <h1 class="w-full text-center text-3xl my-4">Markdown App</h1>
    <section class="flex m-auto w-10/12 h-screen">
      <article class="w-1/2 border">
        <textarea
          :value="text"
          @input="update"
          class="w-full h-full"
          ref="markdownRef"
        ></textarea>
      </article>
      <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import { marked } from "marked";
import useDebounce from '../utils/composotion/useDebounce.jsx';
export default {
  computed: {
    markedText() {
      return marked(this.text);
    },
  },
  data() {
    return {
      text: "",
      debounce: ""
    };
  },
  methods: {
    update(e) {
      const task = () => (this.text = e.target.value);
      this.debounce(task, 500);
    },
  },
  mounted() {
  this.debounce = useDebounce();
    this.$refs.markdownRef.focus();
  },
};
</script>

<style></style>
