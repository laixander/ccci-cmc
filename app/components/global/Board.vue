<script setup lang="ts">
import type { BoardProps } from '~/types/models'
defineProps<BoardProps>()
const showDetails = ref(true)
const toggleDetails = () => {
    showDetails.value = !showDetails.value
}
</script>
<template>
    <Block showDivider noBodyPadding>
        <template #title>
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2">
                    <UChip standalone inset :color="badgeColor" />
                    <span class="text-sm uppercase">{{ title }}</span>
                </div>
                <!-- <UBadge :label="badgeLabel" :color="badgeColor" variant="soft" class="rounded-full" /> -->
                <UTooltip :delay-duration="0" text="Show/Hide Details">
                    <UButton :icon="showDetails ? 'i-lucide-eye-off' : 'i-lucide-eye'" variant="ghost" color="neutral"
                        size="sm" @click="toggleDetails" />
                </UTooltip>
            </div>
        </template>

        <!-- Default slot for card content -->
        <div class="space-y-4 p-3 sm:p-4 dark:bg-gray-950/50 h-full">
            <slot :show-details="showDetails" />
        </div>

        <!-- <div :class="['space-y-4 p-3 sm:p-4 h-full relative', `bg-${badgeColor}`]">
            <div class="-inset-0 absolute bg-white/90 dark:bg-black/90"></div>
            <slot />
        </div> -->
    </Block>
</template>