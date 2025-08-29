<script setup lang="ts">
import type { ListIconProps } from '~/types/models'

defineProps<ListIconProps>()
</script>

<template>
    <div :class="withContainer ? 'bg-elevated/50 rounded-lg p-2 md:p-4' : ''">
        <div class="flex items-center gap-2">
            <div v-if="icon" :class="[styledIcon ? 'bg-accented/50 p-3 rounded-md' : undefined]">
                <UIcon :name="icon" :class="['shrink-0 flex', iconColor || 'text-muted']" />
            </div>
            <div class="flex-1">
                <div :class="['text-sm text-default', description || $slots.description ? 'font-semibold' : undefined]" v-if="label || $slots.label">
                    <slot name="label">{{ label }}</slot>
                </div>
                <div class="text-sm text-muted" v-if="description || $slots.description">
                    <slot name="description">{{ description }}</slot>
                </div>
            </div>
            <div v-if="$slots.actions" class="flex items-center gap-2">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
