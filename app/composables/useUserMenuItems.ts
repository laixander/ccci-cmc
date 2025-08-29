import type { DropdownMenuItem } from '@nuxt/ui'
import { useColorMode, useToast } from '#imports'

export function useUserMenuItems() {
    const colorMode = useColorMode()
    const toast = useToast()

    async function logout () {
        toast.add({
            title: 'Success',
            description: `Logout successfully!`
        })
        await navigateTo('/', {
            replace: true
        })
    }
    const items = computed<DropdownMenuItem[][]>(() => ([
        [
            {
                type: 'label',
                label: 'Juan dela Cruz',
                avatar: {
                    src: 'https://i.pravatar.cc/40',
                }
            }
        ],
        [
            {
                label: 'Profile',
                icon: 'i-lucide-user'
            },
            {
                label: 'Settings',
                icon: 'i-lucide-settings',
            },
            {
                label: 'Switch Role',
                icon: 'i-lucide-user-cog',
                children: ['ILSP Staff', 'Department', 'Administrator', 'Institution', 'System Admin'].map(role => ({
                    label: role,
                    type: 'checkbox',
                    checked: useRole().value === role,
                    onUpdateChecked(checked: boolean) {
                        if (checked) useRole().value = role
                    },
                    onSelect(e: Event) {
                        e.preventDefault()
                    }
                }))
            },
            {
                label: 'Appearance',
                icon: 'i-lucide-sun-moon',
                children: [
                    {
                        label: 'Light',
                        icon: 'i-lucide-sun',
                        type: 'checkbox',
                        checked: colorMode.value === 'light',
                        onSelect(e: Event) {
                            e.preventDefault()
                            colorMode.preference = 'light'
                        }
                    },
                    {
                        label: 'Dark',
                        icon: 'i-lucide-moon',
                        type: 'checkbox',
                        checked: colorMode.value === 'dark',
                        onUpdateChecked(checked: boolean) {
                            if (checked) colorMode.preference = 'dark'
                        },
                        onSelect(e: Event) {
                            e.preventDefault()
                        }
                    }
                ]
            }
        ],
        [
            {
                label: 'Log out',
                icon: 'i-lucide-log-out',
                onSelect: async () => {
                    await logout()
                }
            }
        ]
    ]))

    return items
}