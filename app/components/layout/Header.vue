<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue'
import type { HeaderProps } from '~/types'
import { ref, watch } from 'vue'
import { useBreakpoints, breakpointsTailwind, useTimeoutFn } from '@vueuse/core'
import { useRoute } from '#imports'
import { usePageTitle } from '~/composables/usePageTitle'

defineProps<HeaderProps>()

defineEmits(['toggleSidebar'])

const open = ref(false)

const { pageTitle } = usePageTitle()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('sm')
const route = useRoute()

watch(
    isDesktop,
    (value) => {
        if (value && open.value) {
            open.value = false
        }
    }
)
watch(() => route.fullPath, () => {
    if (open.value) {
        useTimeoutFn(() => {
            open.value = false
        }, 300)
    }
})
</script>
<template>
    <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 bg-default">
        <div class="flex items-center gap-1.5 min-w-0">
            <!-- Sidebar toggle (desktop) -->
            <UButton :icon="collapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'" variant="ghost"
                color="neutral" @click="$emit('toggleSidebar')" class="hidden lg:flex" />

            <!-- Sidebar slideover trigger (mobile) -->
            <USlideover side="left" class="lg:hidden" v-model:open="open">
                <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
                <template #content>
                    <Sidebar slideover :items="items" @close="open = false" />
                </template>
            </USlideover>

            <!-- Page title -->
            <h1 class="flex items-center gap-1.5 font-semibold text-highlighted truncate">
                {{ pageTitle }}
            </h1>
        </div>

        <div class="flex items-center shrink-0 gap-3">
            <UDrawer direction="right" inset>
                <UChip size="lg" inset>
                    <UButton icon="i-lucide-bell" variant="ghost" color="neutral" />
                </UChip>
                <template #content>
                    <ListGroup class="w-[320px] ml-4">
                        <ListItem v-for="n in 12" :key="n" :title="`Notification Title ${n}`"  description="Leslie Alexander • 2d ago" />
                    </ListGroup>
                </template>
            </UDrawer>
        </div>
    </div>
</template>