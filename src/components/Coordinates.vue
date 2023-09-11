<template>
  <div>
    <h3>Coordinates:</h3>
    <ul>
      <li v-for="(point, index) in points" :key="index">
        Point {{ index + 1 }}: x:{{ Math.round(point.x) }} y:{{
          Math.round(point.y)
        }}
      </li>
    </ul>
    <p>Parallelogram Area: {{ area }}</p>
    <p>Circle Area: {{ circleArea.toFixed(2) }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps(['points']);

// function for calculating the area of a parallelogram
const computeArea = () => {
  if (props.points.length < 3) return 0;
  const [p1, p2, p3] = props.points;
  return Math.abs(
    (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2
  );
};

// computed property for parallelogram area
const area = computed(computeArea);

// function for calculating the area of a circle
const computeCircleArea = () => {
  const r = Math.sqrt(area.value / Math.PI);
  return Math.PI * r * r;
};

const circleArea = computed(computeCircleArea);

</script>

