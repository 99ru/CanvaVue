<template>
  <main>
    <h1>JavaScript Vue assignment</h1>
    <Canvas :key="resetCounter" :points="points" @update-points="updatePoints" />
    <Coordinates :points="points" />
    <div class="button-container">
      <button @click="reset">Reset</button>
      <button @click="aboutDialog=true">About</button>
    </div>
    <AboutModal v-if="aboutDialog" @close-about="aboutDialog=false" />
  </main>
</template>


<script setup>
import { ref } from "vue";
import Canvas from "./components/Canvas.vue";
import Coordinates from "./components/Coordinates.vue";
import AboutModal from "./components/About.vue";

const points = ref([]);
const aboutDialog = ref(false);
const resetCounter = ref(0);

const updatePoints = (newPoints) => {
  points.value = newPoints;
};

const reset = () => {
  points.value = [];
  resetCounter.value++;
};

</script>
