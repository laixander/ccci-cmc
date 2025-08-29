<script setup lang="ts">
import type { CardProps } from '~/types/models'

withDefaults(defineProps<CardProps>(), {
  layout: () => ['description', 'highlights', 'tags'],
})
</script>

<template>
    <UCard>
        <!-- Header -->
        <div class="flex items-center gap-3">
            <UAvatar :icon="icon" size="2xl" />
            <div class="flex-1">
                <div class="text-highlighted font-semibold line-clamp-1">{{ title }}</div>
                <slot name="subtitle">
                    <div v-if="subtitle" class="text-sm text-muted">
                        {{ subtitle }}
                    </div>
                </slot>
            </div>

            <slot name="actions">
                <UDropdownMenu v-if="actions?.length" :items="actions"
                    :content="{ align: 'end', side: 'bottom', sideOffset: 8 }">
                    <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
                </UDropdownMenu>
            </slot>
        </div>

        <!-- Body: render sections in the order from `layout` -->
        <template v-for="section in layout" :key="section">
            <!-- Description -->
            <template v-if="section === 'description'">
                <slot name="description">
                    <div v-if="description" class="text-muted text-sm line-clamp-2 mt-4">
                        {{ description }}
                    </div>
                </slot>
            </template>

            <!-- Highlights -->
            <template v-else-if="section === 'highlights'">
                <slot name="highlights" />
            </template>

            <!-- Tags -->
            <template v-else-if="section === 'tags'">
                <slot name="tags">
                    <div v-if="tags?.length" class="flex flex-wrap gap-2 mt-4">
                        <UBadge v-for="(tag, index) in tags" :key="index" :label="tag" variant="soft"
                            color="neutral" />
                    </div>
                </slot>
            </template>
        </template>
    </UCard>
</template>
