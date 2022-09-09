<template>
  <div class="flex flex-wrap w-full relative">
    <div v-for="(color, index) in slides" :key="color" class="absolute w-full">
      <transition name="fade">
        <div
          v-if="currentSlide == index"
          style="height: 350px"
          :class="color"
        ></div>
      </transition>
    </div>
    <div class="w-full" style="height: 340px">
      <div class="absolute w-full flex justify-center bottom-0">
        <div
          v-for="(slide, index) in slides"
          :key="slide"
          @click="makeActive(index)"
          :class="currentSlide == index ? 'bg-gray-700' : 'bg-gray-300'"
          class="mx-1 w-4 h-4 rounded-full cursor-pointer shadow-md"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      interval: "",
      slides: ["bg-blue-600", "bg-yellow-600", "bg-teal-600"],
    };
  },
  methods: {
    makeActive(index) {
      this.currentSlide = index;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.currentSlide == 2) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
    }, 4000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>