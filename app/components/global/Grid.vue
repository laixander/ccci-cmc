<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cols: Number,
  sm: Number,
  md: Number,
  lg: Number,
  xl: Number,
  xxl: Number,
  gap: { type: Number, default: 4 },
  gapX: Number,
  gapY: Number,
})

const gridClass = computed(() => {
  const classList = ['grid']

  // Column classes
  if (props.cols === 1) classList.push('grid-cols-1')
  if (props.cols === 2) classList.push('grid-cols-2')
  if (props.cols === 3) classList.push('grid-cols-3')
  if (props.cols === 4) classList.push('grid-cols-4')
  if (props.cols === 5) classList.push('grid-cols-5')
  if (props.cols === 6) classList.push('grid-cols-6')

  if (props.sm === 2) classList.push('sm:grid-cols-2')
  if (props.sm === 3) classList.push('sm:grid-cols-3')
  if (props.sm === 4) classList.push('sm:grid-cols-4')
  if (props.sm === 5) classList.push('sm:grid-cols-5')

  if (props.md === 2) classList.push('md:grid-cols-2')
  if (props.md === 3) classList.push('md:grid-cols-3')
  if (props.md === 4) classList.push('md:grid-cols-4')
  if (props.md === 5) classList.push('md:grid-cols-5')

  if (props.lg === 2) classList.push('lg:grid-cols-2')
  if (props.lg === 3) classList.push('lg:grid-cols-3')
  if (props.lg === 4) classList.push('lg:grid-cols-4')
  if (props.lg === 5) classList.push('lg:grid-cols-5')

  if (props.xl === 2) classList.push('xl:grid-cols-2')
  if (props.xl === 3) classList.push('xl:grid-cols-3')

  if (props.xxl === 2) classList.push('2xl:grid-cols-2')
  if (props.xxl === 3) classList.push('2xl:grid-cols-3')

  // Gaps
  if (props.gapX) classList.push(`gap-x-${props.gapX}`)
  if (props.gapY) classList.push(`gap-y-${props.gapY}`)
  if (!props.gapX && !props.gapY) classList.push(`gap-${props.gap}`)

  return classList
})
</script>
