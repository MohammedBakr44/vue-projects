<template>
  <div class="text-center">
    <h1 class="text-center text-2xl">DC Heros {{ herosCount }}</h1>
    <ul>
      <!-- :value works the same as v-bind:value -->
      <li
        class="flex justify-between my-2"
        v-for="(hero, index) in dcHeros"
        :key="hero.name"
      >
        <div>{{ hero.name }}</div>
        <button @click="remove(index)">x</button>
      </li>
    </ul>
    <!-- :[] dynamic attribute -->
    <!-- .prevent is the same as e.preventDefault -->
    <form @submit.prevent="addHero">
      <input
        class="block my-10 text-center border rounded"
        v-model="newHero"
        placeholder="Type hero name here"
        ref="newHeroRef"
      />
      <!-- @event == v-on:event -->
      <button
        class="border rounded bg-gradient-to-r from-red-700 to-pink-500 text-white py-1 px-1"
        type="submit"
      >
        Add hero
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
export default {
  setup() {
    const newHeroRef = ref("");
    const newHero = ref("");
    const dcHeros = ref([
      { name: "SuperGirl" },
      { name: "Batman" },
      { name: "Superman" },
      { name: "Flash" },
      { name: "Arrow" },
    ]);

    onMounted(() => {
      newHeroRef.value.focus();
    });
    const herosCount = computed({
      get: () => dcHeros.value.length,
    });
    const remove = (index) => {
      dcHeros.value = dcHeros.value.filter((hero, i) => i != index);
    };
    const addHero = () => {
      if (newHero.value !== "") {
        dcHeros.value.push({ name: newHero.value });
        newHero.value = "";
      }
    };
    return { dcHeros, newHero, remove, addHero, newHeroRef, herosCount };
  },
};
</script>

<style></style>
