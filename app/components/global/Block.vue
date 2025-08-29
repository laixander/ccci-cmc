<script setup lang="ts">
import type { BlockProps } from '~/types/models'
const props = withDefaults(defineProps<BlockProps>(), {
    showDivider: false,
    noBodyPadding: false
})

const uiCardConfig = {
    root: `relative w-full ${props.showDivider ? '' : 'divide-none'}`.trim(),
    // root: props.showDivider ? undefined : 'divide-none',
    body: `h-full space-y-2 ${props.noBodyPadding ? 'p-0 sm:p-0' : undefined}`.trim(),
}
</script>
<template>
    <UCard :ui="uiCardConfig">
        <template #header v-if="title || description || icon || $slots.actions || $slots.title || $slots.description">
            <div class="relative flex flex-col gap-5 lg:flex-row lg:items-center">
                <div class="flex items-center gap-4 w-full">
                    <UBadge v-if="icon" :icon="icon" variant="soft" color="neutral" size="xl" class="rounded-full p-2.5" />
                    <div class="flex-1 space-y-0.5">
                        <div class="text-pretty font-semibold text-highlighted">
                            <slot name="title">
                                {{ title }}
                            </slot>
                        </div>
                        <div v-if="description || $slots.description" class="text-sm text-pretty text-muted">
                            <slot name="description">
                                {{ description }}
                            </slot>
                        </div>
                    </div>
                </div>
                <div v-if="$slots.actions" class="grid gap-1 md:gap-2 md:flex">
                    <slot name="actions" />
                </div>
            </div>
        </template>
        <slot />
        <template #footer v-if="$slots.extra">
            <slot name="extra" />
        </template>
    </UCard>
</template>