<template>
  <div :class="gridSpanClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  span: Number,     // Default span
  sm: Number,
  md: Number,
  lg: Number,
  xl: Number,
  xxl: Number,
})

const gridSpanClass = computed(() => {
  const classList = []

  // Base col span
  if (props.span === 1) classList.push('col-span-1')
  if (props.span === 2) classList.push('col-span-2')
  if (props.span === 3) classList.push('col-span-3')
  if (props.span === 4) classList.push('col-span-4')
  if (props.span === 5) classList.push('col-span-5')
  if (props.span === 6) classList.push('col-span-6')
  if (props.span === 12) classList.push('col-span-12')

  // Responsive spans
  if (props.sm === 1) classList.push('sm:col-span-1')
  if (props.sm === 2) classList.push('sm:col-span-2')
  if (props.sm === 3) classList.push('sm:col-span-3')
  if (props.sm === 4) classList.push('sm:col-span-4')

  if (props.md === 1) classList.push('md:col-span-1')
  if (props.md === 2) classList.push('md:col-span-2')
  if (props.md === 3) classList.push('md:col-span-3')
  if (props.md === 4) classList.push('md:col-span-4')

  if (props.lg === 1) classList.push('lg:col-span-1')
  if (props.lg === 2) classList.push('lg:col-span-2')
  if (props.lg === 3) classList.push('lg:col-span-3')
  if (props.lg === 4) classList.push('lg:col-span-4')

  if (props.xl === 1) classList.push('xl:col-span-1')
  if (props.xl === 2) classList.push('xl:col-span-2')
  if (props.xl === 3) classList.push('xl:col-span-3')
  if (props.xl === 4) classList.push('xl:col-span-4')

  if (props.xxl === 1) classList.push('2xl:col-span-1')
  if (props.xxl === 2) classList.push('2xl:col-span-2')
  if (props.xxl === 3) classList.push('2xl:col-span-3')
  if (props.xxl === 4) classList.push('2xl:col-span-4')

  return classList
})
</script>
