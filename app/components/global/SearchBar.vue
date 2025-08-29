<script setup lang="ts">
import { computed } from 'vue'
import Block from '~/components/global/Block.vue'

const props = defineProps<{
    placeholder?: string
    search: string
}>()

const emit = defineEmits([
    'update:search',
    'search'
])

const searchQuery = computed({
    get: () => props.search,
    set: val => emit('update:search', val)
})

// Emits the search event with the current search query
const emitSearch = () => {
    emit('search', searchQuery.value)
}
</script>
<template>
    <Block>
        <div class="flex gap-2">
            <UInput :placeholder="placeholder" icon="i-lucide-search" size="lg" class="flex-1" v-model="searchQuery"
                @keydown.enter="emitSearch" @blur="emitSearch" />
            <slot />
        </div>
    </Block>
</template>