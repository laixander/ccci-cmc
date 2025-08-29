export default defineAppConfig({
    ui: {
        colors: {
            primary: 'sky',
            secondary: 'blue',
            success: 'green',
            info: 'cyan',
            warning: 'yellow',
            error: 'red',
            neutral: 'slate',
            red: 'red',
            orange: 'orange',
            amber: 'amber',
            yellow: 'yellow',
            lime: 'lime',
            green: 'green',
            emerald: 'emerald',
            teal: 'teal',
            cyan: 'cyan',
            sky: 'sky',
            blue: 'blue',
            indigo: 'indigo',
            violet: 'violet',
            purple: 'purple',
            fuchsia: 'fuchsia',
            pink: 'pink',
            rose: 'rose'
        },
        card: {
            slots: {
                root: 'shadow-sm hover:shadow-lg transition-shadow',
                // header: 'p-3 sm:p-4',
                // body: 'p-3 sm:p-4',
                // footer: 'p-3 sm:p-4'
            }
        },
        badge: {
            slots: {
                base: '!rounded-full',
            },
        }
    }
})