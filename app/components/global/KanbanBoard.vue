<script setup lang="ts">
import draggable from 'vuedraggable'

const columns = ref([
    {
        id: 1,
        title: 'Backlog',
        items: [
            { id: 'b1', text: 'Setup project repo' },
            { id: 'b2', text: 'Write documentation' }
        ]
    },
    {
        id: 2,
        title: 'In Progress',
        items: [
            { id: 'p1', text: 'Build UI components' },
            { id: 'p2', text: 'Implement API calls' }
        ]
    },
    {
        id: 3,
        title: 'Review',
        items: [
            { id: 'r1', text: 'Test drag & drop' }
        ]
    },
    {
        id: 4,
        title: 'Done',
        items: [
            { id: 'd1', text: 'Create Kanban layout' }
        ]
    }
])

const dragOptions = {
    group: { name: 'kanban', pull: true, put: true },
    animation: 200,
    ghostClass: 'ghost'
}
</script>

<template>
    <div class="grid grid-cols-4 gap-4 p-4">
        <div v-for="column in columns" :key="column.id" class="flex flex-col bg-gray-50 rounded-lg shadow p-3">
            <h2 class="text-lg font-bold mb-2">{{ column.title }}</h2>
            <ClientOnly>
                <draggable v-model="column.items" v-bind="dragOptions" item-key="id" class="flex flex-col gap-2">
                    <template #item="{ element }">
                        <UCard class="cursor-move">
                            {{ element.text }}
                        </UCard>
                    </template>
                </draggable>
            </ClientOnly>

        </div>
    </div>
</template>

<style scoped>
/* Optional: Makes dragging look nicer */
.ghost {
    opacity: 0.4;
}
</style>
