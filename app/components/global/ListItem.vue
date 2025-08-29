<script setup lang="ts">
import type { ListItemProps } from '~/types/models'
defineProps<ListItemProps>()
</script>
<template>
    <div class="flex items-center gap-3 w-full">
        <div class="flex-1">
            <div v-if="$slots.title || title" class="font-semibold text-sm text-highlighted">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <div v-if="$slots.description || description" class="text-xs text-muted">
                <slot name="description">
                    {{ description }}
                </slot>
            </div>
        </div>
        <UChip standalone inset color="emerald" />
    </div>
</template>