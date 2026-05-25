<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Sun, Moon, FileSearch } from 'lucide-vue-next'

const isDark = ref(false)
const route = useRoute()

onMounted(() => {
  isDark.value = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  apply()
})
function apply() {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.theme = isDark.value ? 'dark' : 'light'
}
function toggle() { isDark.value = !isDark.value; apply() }
</script>

<template>
  <header class="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center shadow-lg shadow-brand-500/30">
          <FileSearch class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold text-lg tracking-tight">ATS<span class="text-brand-600">Analyzer</span></span>
      </RouterLink>
      <nav class="flex items-center gap-2">
        <RouterLink to="/" class="btn-ghost text-sm" :class="{ 'text-brand-600': route.path === '/' }">Home</RouterLink>
        <RouterLink to="/results" class="btn-ghost text-sm" :class="{ 'text-brand-600': route.path === '/results' }">Results</RouterLink>
        <button @click="toggle" class="btn-ghost !p-2.5" aria-label="Toggle theme">
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>
      </nav>
    </div>
  </header>
</template>
