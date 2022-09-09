<template>
  <div class="m-auto">
    <h1 class="text-2xl my-2 text-center">Vue Calendar</h1>
    <sction class="mx-2 flex justify-between">
      <h2 class="font-bold">{{ currentMonthName }}</h2>
      <h2 class="font-bold">{{ currentYear }}</h2>
    </sction>
    <section class="flex">
      <p class="text-center" v-for="day in days" :key="day">
        {{ day }}
      </p>
    </section>

    <section class="my-2 flex flex-wrap">
      <p class="text-center" v-for="num in startDay()" :key="num"></p>
      <p
        class="text-center"
        :class="currentDateClass(num)"
        v-for="num in daysInMonth()"
        :key="num"
      >
        {{ num }}
      </p>
    </section>
    <section class="flex justify-between my-5">
      <button class="px-2 border rounded" @click="prev">Prev</button>
      <button class="px-2 border rounded" @click="next">Next</button>
    </section>
  </div>
</template>

<script>
const data = () => ({
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  currentDate: new Date().getUTCDate(),
});
export default {
  data,
  methods: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    startDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    next() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    prev() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    currentDateClass(num) {
      const currentMonthDate = new Date(
        this.currentYear,
        this.currentMonth,
        num
      ).toDateString();
      const currentDate = new Date().toDateString();
      return currentMonthDate === currentDate ? "text-yellow-600" : "";
    },
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        { month: "long" }
      );
    },
  },
};
</script>

<style>
section > p {
  width: 14.28%;
}
</style>