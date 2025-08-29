<script setup lang="ts">
import type { BoardCardProps, BoardCardReviewer } from '~/types/models'

const props = defineProps<BoardCardProps & { showDetails: boolean }>()

const progress = defineModel<number>('progress')

const reviewers: BoardCardReviewer[] = ['Internal', 'Partner', 'Legal', 'Final'];

// Mapping source type to color
const sourceColor = computed(() => {
    return props.source === 'external' ? 'primary' : 'secondary'
})

// Mapping priority level to color
const priorityColor = computed(() => {
    switch (props.priority) {
        case 'high':
            return 'error'
        case 'medium':
            return 'warning'
        case 'low':
            return 'neutral'
        default:
            return 'neutral'
    }
})

const emit = defineEmits(['navigate'])

function handleClick() {
    // Just tell the parent to navigate — no path given
    emit('navigate')
}

const uiAlertConfig = {
    root: 'px-3.5 py-2'
}
</script>
<template>
    <Block noBodyPadding>
        <div :class="['absolute w-full h-2', `bg-${boardColor}`]">
            <div class="absolute inset-0 bg-white/80 dark:bg-black/80"></div>
        </div>
        <div :class="['p-3 sm:p-4 hover:cursor-pointer', showDetails ? 'space-y-4' : 'space-y-2']" @click="handleClick">
            <!-- Title & Institution/Contact -->
            <div class="space-y-1 pt-0.5 sm:pt-1">
                <div class="text-highlighted font-semibold">{{ title }}</div>
                <div v-if="showDetails" class="space-y-0.5 *:flex *:justify-start *:items-center *:gap-2">
                    <div class="*:text-sm *:text-muted">
                        <UIcon name="i-lucide-building" />
                        <span>{{ institution }}</span>
                    </div>
                    <div class="*:text-sm *:text-muted">
                        <UIcon name="i-lucide-users" />
                        <span>{{ contact }}</span>
                    </div>
                </div>
            </div>

            <slot name="content">
                <!-- Description -->
                <div v-if="description" class="text-sm text-toned text-pretty truncate line-clamp-2">
                    {{ description }}
                </div>
                <!-- Progress Bar -->
                <UFormField v-if="progress" label="Progress" :hint="`${progress}%`">
                    <UProgress v-model="progress" size="sm" color="primary" />
                </UFormField>
                <!-- Progress Check -->
                <div v-if="reviewer" class="flex items-center gap-4">
                    <template v-for="rev in reviewers" :key="rev">
                        <div class="inline-flex items-center gap-1">
                            <!-- Completed + active -->
                            <UIcon
                                v-if="props.reviewer !== undefined && reviewers.indexOf(rev) <= reviewers.indexOf(props.reviewer)"
                                name="i-lucide-check-circle-2"
                                class="size-5 text-success"
                            />
                            <!-- Pending -->
                            <UIcon
                                v-else
                                name="i-lucide-circle"
                                class="size-5 text-dimmed"
                            />

                            <span
                                class="text-sm"
                                :class="props.reviewer !== undefined && reviewers.indexOf(rev) <= reviewers.indexOf(props.reviewer) ? 'text-success' : 'text-dimmed'"
                            >
                                {{ rev }}
                            </span>
                        </div>
                    </template>
                </div>
                <!-- Badges -->
                <div class="flex items-center gap-2">
                    <UBadge v-if="source" :label="source" :color="sourceColor" variant="soft" />
                    <UBadge v-if="priority" :label="priority" :color="priorityColor" variant="soft" />
                    <span v-if="dueDate" class="text-dimmed text-xs">Due on {{ dueDate }}</span>
                </div>
                <!-- Alert -->
                <UAlert v-if="alert" :description="alert" variant="subtle" color="secondary" :ui="uiAlertConfig" />
            </slot>

            <!-- Time Submitted -->
            <div v-if="showDetails" class="flex justify-start items-center gap-2 *:text-xs *:text-dimmed">
                <UIcon name="i-lucide-clock" />
                <span>{{ timeSubmitted }}</span>
            </div>
        </div>
    </Block>
</template>