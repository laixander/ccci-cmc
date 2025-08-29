<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})
</script>
<template>
    <div class="fixed inset-0 flex justify-center items-center bg-gray-50 dark:bg-gray-950">
        <UCard>
            <header class="space-y-2">
                <div class="font-semibold text-xl text-highlighted text-center">Login</div>
                <div class="text-sm text-muted text-center">Enter your credentials to access your account</div>
            </header>
            <main class="space-y-4 mt-10">
                <UFormField label="Username">
                    <UInput placeholder="Enter your username" variant="soft" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="Password">
                    <UInput placeholder="Enter your password" variant="soft" size="lg" type="password" class="w-full" />
                </UFormField>
                <UFormField label="User Role">
                    <USelect placeholder="Select your role" :items="['Admin', 'User', 'Guest']" variant="soft" size="lg" class="w-full" />
                </UFormField>
                <UButton label="Login" size="lg" class="justify-center" block to="/dashboard" />
            </main>
            <footer class="text-center mt-8">
                <ULink as="button" class="text-sm">Forgot Password?</ULink>
            </footer>
        </UCard>
    </div>
</template>