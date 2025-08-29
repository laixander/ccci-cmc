<script setup lang="ts">
import UserMenu from '~/components/layout/UserMenu.vue'
import type { SidebarProps } from '~/types'

defineProps<SidebarProps & { slideover?: boolean }>()

defineEmits(['close'])

const uiNavConfig = {
    label: 'tracking-widest',
    link: 'p-2.5',
}
</script>
<template>
    <div class="h-16 shrink-0 flex justify-center items-center gap-1.5 px-2 lg:border-b lg:border-default">
        <UButton :avatar="{
            alt: 'C',
            size: 'lg',
            ui: {
                root: 'rounded-xl bg-primary',
                fallback: 'text-white'
            }
        }" :label="collapsed ? undefined : 'CMC Application'" color="neutral" variant="link"
            :class="collapsed ? '' : 'w-full'" />
            
        <!-- if USlideover is active, don't hide this button, otherwise hide it -->
        <UButton v-if="slideover" icon="i-lucide-x" variant="ghost" color="neutral" class="mr-2.5"
            @click="$emit('close')" />
    </div>
    <div class="flex flex-col gap-4 flex-1 overflow-y-auto p-4">
        <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-full"
            :collapsed="collapsed" :tooltip="collapsed" :popover="collapsed" :ui="uiNavConfig" />
    </div>
    <div class="shrink-0 flex items-center gap-1.5 p-4 lg:border-t lg:border-default">
        <UserMenu :collapsed="collapsed" />
    </div>
</template>