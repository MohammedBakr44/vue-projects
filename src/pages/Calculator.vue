<template>
  <section class="w-full flex justify-center">
    <div class="m-auto">
      <h1 class="text-bold text-2xl text-center">Calculator</h1>
      <p
        class="text-3xl text-right h-15 mt-10 mb-2 w-32 overflow-x-scroll"
        style="direction: rtl"
      >
        {{ currentNumber }}
      </p>
      <div class="h-10">
        <small v-if="operation"
          >{{ prevNumber }} {{ operation }} {{ currentNumber }}</small
        >
      </div>
      <div class="grid grid-cols-4 gap-2">
        <button
          @click="pressed('1')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          1
        </button>
        <button
          @click="pressed('2')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          2
        </button>
        <button
          @click="pressed('3')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          3
        </button>
        <button
          @click="pressed('+')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          +
        </button>

        <button
          @click="pressed('4')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          4
        </button>
        <button
          @click="pressed('5')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          5
        </button>
        <button
          @click="pressed('6')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          6
        </button>
        <button
          @click="pressed('-')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          -
        </button>
        <button
          @click="pressed('7')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          7
        </button>
        <button
          @click="pressed('8')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          8
        </button>

        <button
          @click="pressed('9')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          9
        </button>
        <button
          @click="pressed('*')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          *
        </button>
        <button @click="pressed('0')" class="p-2 h-10 border rounded shadow">
          0
        </button>
        <button @click="pressed('c')" class="p-2 h-10 border rounded shadow">
          C
        </button>
        <button
          @click="pressed('=')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          =
        </button>

        <button
          @click="pressed('/')"
          class="p-2 w-10 h-10 border rounded shadow"
        >
          /
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import useWindowEvent from "../utils/composotion/useWindowEvent.jsx";
export default {
  setup() {
    const operations = ["+", "-", "*", "/"];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const currentNumber = ref("");
    const prevNumber = ref("");
    const operation = ref("");

    const handleKeydown = (e) => {
      pressed(e.key);
    };

    useWindowEvent('keydown',handleKeydown);

    const pressed = (value) => {
      if (value == "=" || value == "Enter") calculate();
      else if (value === "c") clear();
      else if (operations.includes(value)) applyOperation(value);
      else if (numbers.includes(+value)) appendNumber(value);
    };
    const appendNumber = (value) => {
      currentNumber.value += value;
    };

    const clear = () => {
      currentNumber.value = "";
    };

    const applyOperation = (value) => {
      prevNumber.value = currentNumber.value;
      currentNumber.value = "";
      operation.value = value;
    };
    const calculate = () => {
      switch (operation.value) {
        case "+":
          sum();
          break;
        case "-":
          subtract();
          break;
        case "*":
          multiply();
          break;
        default:
          divide();
          break;
      }
      prevNumber.value = "";
      operation.value = "";
    };
    const sum = () =>
      (currentNumber.value = +prevNumber.value + +currentNumber.value);
    const subtract = () =>
      (currentNumber.value = prevNumber.value - currentNumber.value);
    const multiply = () =>
      (currentNumber.value = prevNumber.value * currentNumber.value);
    const divide = () =>
      (currentNumber.value = prevNumber.value / currentNumber.value);
    return { pressed, currentNumber, operation, prevNumber };
  },
};
</script>

<style></style>
