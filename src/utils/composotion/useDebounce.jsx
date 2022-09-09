import { ref } from "vue";

const useDebounce = (func, wait) => {
  const timeout = ref("");
  function debounce(func, wait) {
    clearTimeout(timeout.value);
    timeout.value = setTimeout(func, wait);
  }
  return debounce;
};

export default useDebounce;
