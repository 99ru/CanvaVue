Canvas.vue

code:

<template>
  <canvas
    ref="canvas"
    @mousedown="handleMouseDown"
    @mousemove="handleDrag"
    @mouseup="stopDrag"
    width="800"
    height="600"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";

const emit = defineEmits();
const props = defineProps(["points"]);
const canvas = ref(null);
const currentDraggingPoint = ref(null); 

const isPointClicked = (point, x, y) => {
  return Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) < 5.5;
};

const handleMouseDown = (event) => {
  if (props.points.length < 3) {
    setPoint(event);
  } else {
    startDragging(event);
  }
};

const startDragging = (event) => {
  const rect = canvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const clickedPoint = props.points.findIndex((p) => isPointClicked(p, x, y));
  if (clickedPoint !== -1) {
    currentDraggingPoint.value = clickedPoint;
  }
};

const handleDrag = (event) => {
  if (currentDraggingPoint.value !== null) {
    const rect = canvas.value.getBoundingClientRect();
    props.points[currentDraggingPoint.value] = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    drawCanvas();
    emit("update-points", props.points);
  }
};

const stopDrag = () => {
  currentDraggingPoint.value = null;
};

const getParallelogramArea = (A, B, C) => {
  return Math.abs((A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2);
};

const drawCanvas = () => {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  props.points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5.5, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
  });

  if (props.points.length === 3) {
    const [A, B, C] = props.points;
    const D = { x: B.x + C.x - A.x, y: B.y + C.y - A.y };

    // Draw the parallelogram
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(D.x, D.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // Draw the circle
    const centerX = (A.x + B.x + C.x + D.x) / 4;
    const centerY = (A.y + B.y + C.y + D.y) / 4;

    const area = getParallelogramArea(A, B, C);
    const circleRadius = Math.sqrt((2 * area) / Math.PI);
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
  }
};

const setPoint = (event) => {
  if (currentDraggingPoint.value !== null) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (props.points.length < 3) {
    props.points.push({ x, y });
    drawCanvas();
    emit("update-points", props.points);
  }
};

onMounted(() => {
  drawCanvas();
});

// Watch for changes so we can redraw the canvas
watch(props.points, () => {
  drawCanvas();
});

</script>

