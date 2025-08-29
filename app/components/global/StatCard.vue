<script setup lang="ts">
import { computed } from 'vue'
import type { StatCardProps } from '~/types/models'

const props = defineProps<StatCardProps>()

const trendDirection = computed(() =>
    props.trendValue?.startsWith('-') ? 'down' : 'up'
)
</script>
<template>
    <!-- <UCard :class="[
        useGradient && 'bg-gradient-to-tr from-5% to-default',
        useGradient && color === 'warning' && 'from-warning/10',
        useGradient && color === 'secondary' && 'from-secondary/10',
        useGradient && color === 'success' && 'from-success/10',
        useGradient && color === 'error' && 'from-error/10',
        useGradient && color === 'purple' && 'from-purple/10'
    ]"> -->
    <UCard>
        <!-- Adjust vertical alignment based on hasDetails -->
        <div :class="['flex justify-between', hasDetails ? 'items-start' : 'items-center']">
            <div>
                <h4 :class="['text-toned', hasDetails ? 'font-semibold' : 'text-sm']">{{ label }}</h4>

                <!-- Increase top margin if hasDetails -->
                <p :class="['text-2xl text-highlighted font-bold', hasDetails ? 'mt-8' : 'mt-1']">{{ count }}</p>

                <!-- Optional trend section -->
                <div v-if="hasDetails">
                    <div class="flex items-center space-x-1 text-xs mt-1">
                        <UIcon :name="trendDirection === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                            :class="[
                                'size-4 shrink-0',
                                trendDirection === 'up' ? 'text-success' : 'text-error'
                            ]" />
                        <span :class="trendDirection === 'up' ? 'text-success' : 'text-error'">
                            {{ trendValue }}
                        </span>
                        <span class="text-muted">from last month</span>
                    </div>
                    <p class="text-xs text-muted">{{ trendDescription }}</p>
                </div>
            </div>

            <!-- Only show background if hasDetails -->
            <!-- <div :class="[
                hasDetails ? 'rounded-full p-3' : '',
                hasDetails && color === 'warning' && 'bg-warning/10',
                hasDetails && color === 'secondary' && 'bg-secondary/10',
                hasDetails && color === 'success' && 'bg-success/10',
                hasDetails && color === 'error' && 'bg-error/10',
                hasDetails && color === 'purple' && 'bg-purple/10'
            ]"> -->
            <div :class="[
                'rounded-full p-3',
                color === 'warning' && 'bg-warning/10',
                color === 'secondary' && 'bg-secondary/10',
                color === 'success' && 'bg-success/10',
                color === 'info' && 'bg-info/10',
                color === 'error' && 'bg-error/10',
                color === 'purple' && 'bg-purple/10',
                color === 'pink' && 'bg-pink/10'
            ]">
                <!-- <UIcon :name="icon" :class="[
                    'shrink-0 flex',
                    hasDetails ? 'size-5' : 'size-6',
                    `text-${color}`
                ]" /> -->
                <UIcon :name="icon" :class="[
                    'shrink-0 flex size-5',
                    `text-${color}`
                ]" />
            </div>
        </div>
    </UCard>
</template>
