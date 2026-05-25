<script setup>
import { Lightbulb } from 'lucide-vue-next'
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="card">
    <div class="flex items-center gap-2 mb-4">
      <Lightbulb class="w-5 h-5 text-brand-500" />
      <h3 class="font-semibold">Recommendations</h3>
    </div>
    <ol v-if="items.length" class="relative border-l-2 border-brand-200 dark:border-brand-900/50 pl-5 space-y-4">
      <li v-for="(r, i) in items" :key="i" class="relative">
        <span class="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-brand-gradient ring-4 ring-white dark:ring-slate-950"></span>
        <p class="text-sm">{{ r }}</p>
      </li>
    </ol>
    <p v-else class="text-sm text-slate-500">No recommendations.</p>
  </div>
</template>
