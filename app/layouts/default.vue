<script setup lang="ts">
import { navigationMenuItemsByRole } from '~/data'
import { useRole } from '~/composables/useRole'

const pageTitle = ref()

// Handle sidebar collapsed
const collapsed = ref(false)
const toggleSidebar = () => {
    collapsed.value = !collapsed.value
}

// Get current role and compute links
const role = useRole()
const links = computed(() => navigationMenuItemsByRole[role.value] ?? [])
</script>
<template>
    <div class="fixed inset-0 flex overflow-hidden bg-gray-50 dark:bg-gray-950">
        <!-- collapsed: add class w-auto -->
        <div class="relative hidden lg:flex flex-col min-h-svh shrink-0 border-r border-default bg-default" :class="collapsed ? 'min-w-16 w-auto' : 'min-w-60'">
            <LayoutSidebar
                :collapsed="collapsed"
                :items="links"
            />
        </div>
        <!-- <USeparator orientation="vertical" /> -->

        <div class="relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1">
            <LayoutHeader
                :collapsed="collapsed"
                :items="links"
                :title="pageTitle"
                @toggleSidebar="toggleSidebar"
            />
            <slot />
        </div>
    </div>
</template>