<script setup>
import { Trophy } from 'lucide-vue-next'
defineProps({ verdict: String })
</script>

<template>
  <div class="card relative overflow-hidden">
    <div class="absolute inset-0 bg-brand-gradient opacity-10"></div>
    <div class="relative flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-brand-gradient grid place-items-center shadow-lg shadow-brand-500/30 shrink-0">
        <Trophy class="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 class="font-bold text-lg">Final Verdict</h3>
        <p class="mt-1 text-slate-700 dark:text-slate-200">{{ verdict || 'No verdict available.' }}</p>
      </div>
    </div>
  </div>
</template>
