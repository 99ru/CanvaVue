<template>
  <dialog :open="isOpen">
    <h2>About This App</h2>
    <p>
      This application allows users to select three points on a canvas. Once
      selected, the application draws a parallelogram using the three points and
      the calculated fourth point. Additionally, a yellow circle is drawn based
      on the dimensions and center of the parallelogram. Points that are
      actively selected by the user appear in red, and these points can be
      moved, causing the associated shapes to update in real-time.
    </p>
    <p><strong>Author:</strong> Yan Rudish</p>

    <form method="dialog">
      <button @click="closeAbout">Close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";

const emit = defineEmits();
const isOpen = ref(true);

const closeAbout = () => {
  isOpen.value = false;
};

watch(isOpen, (newVal) => {
  if (!newVal) {
    emit("close-about");
  }
});
</script>
