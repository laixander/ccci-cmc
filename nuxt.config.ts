// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@nuxt/fonts'],
    app: {
        head: {
            title: 'CMC Applications',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'A professional web application built with Nuxt UI, featuring multiple pages, data visualization, and comprehensive management capabilities.' }
            ],
            link: [
                { rel: 'icon', href: '/favicon.ico' },
            ],
            htmlAttrs: {
                lang: 'en'
            }
        }
    },
    css: ['~/assets/css/main.css'],
    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            styles: ['normal', 'italic'],
        },
    },
    ui: {
        theme: {
            colors: [
              'primary',
              'secondary',
              'success',
              'info',
              'warning',
              'error',
              'neutral',
              'red',
              'orange',
              'amber',
              'yellow',
              'lime',
              'green',
              'emerald',
              'teal',
              'cyan',
              'sky',
              'blue',
              'indigo',
              'violet',
              'purple',
              'fuchsia',
              'pink',
              'rose'
            ]
        }
    }
})