<script setup>
import { AlertTriangle, Info } from 'lucide-vue-next'
defineProps({
  title: String,
  items: { type: Array, default: () => [] },
  icon: { type: String, default: 'info' } // info | warn
})
</script>

<template>
  <div class="card">
    <div class="flex items-center gap-2 mb-4">
      <component :is="icon === 'warn' ? AlertTriangle : Info"
        class="w-5 h-5" :class="icon === 'warn' ? 'text-amber-500' : 'text-brand-500'" />
      <h3 class="font-semibold">{{ title }}</h3>
    </div>
    <ul v-if="items.length" class="space-y-2.5">
      <li v-for="(t, i) in items" :key="i"
        class="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm">
        <span class="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
          :class="icon === 'warn' ? 'bg-amber-500' : 'bg-brand-500'"></span>
        <span>{{ t }}</span>
      </li>
    </ul>
    <p v-else class="text-sm text-slate-500">No issues detected. 🎉</p>
  </div>
</template>
