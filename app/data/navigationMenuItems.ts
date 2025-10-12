import type { NavigationMenuItem } from '@nuxt/ui'

export const navigationMenuItemsByRole: Record<string, NavigationMenuItem[]> = {
    'ILSP Staff': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Menu 1', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Menu 2', icon: 'i-lucide-inbox', to: '/innerpage' },
            { label: 'Menu 3', icon: 'i-lucide-git-branch' },
            { label: 'Menu 4', icon: 'i-lucide-users' },
            { label: 'Menu 5', icon: 'i-lucide-file-text' },
            { label: 'Menu 6', icon: 'i-lucide-folder-open' },
            { label: 'Menu 7', icon: 'i-lucide-clipboard-check' },
            { label: 'Menu 8', icon: 'i-lucide-chart-column' },
            { label: 'Menu 9', icon: 'i-lucide-user-plus' }
        ]
    ],
    'Department': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Menu 1', icon: 'i-lucide-folder-open', to: '/dashboard'  },
            { label: 'Menu 2', icon: 'i-lucide-chart-column', to: '/innerpage' }
        ]
    ],
    'Administrator': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Menu 3', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Menu 4', icon: 'i-lucide-bell', to: '/innerpage' },
            { label: 'Menu 5', icon: 'i-lucide-settings' }
        ]
    ],
    'Institution': [
        [
            { label: 'MAIN NAVIGATION', type: 'label',  },
            { label: 'Menu 6', icon: 'i-lucide-chart-column', to: '/dashboard' },
            { label: 'Menu 7', icon: 'i-lucide-settings', to: '/innerpage' }
        ]
    ],
    'System Admin': [
        [
            { label: 'MAIN NAVIGATION', type: 'label',  },
            { label: 'Menu 6', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Menu 7', icon: 'i-lucide-user', to: '/innerpage' },
            { label: 'Menu 8', icon: 'i-lucide-user-cog' },
            { label: 'Menu 9', icon: 'i-lucide-settings' }
        ]
    ]
}