// composables/usePageTitle.ts
import { computed } from 'vue'
import { useRoute } from '#imports'
import { customTitles } from '~/data'

export function usePageTitle() {
    const route = useRoute()

    const pageTitle = computed(() => {
        const name = String(route.name ?? '')
        return customTitles[name] || name
            .replace(/[-._]/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, l => l.toUpperCase())
    })

    return {
        pageTitle,
    }
}