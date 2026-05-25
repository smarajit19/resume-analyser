<script setup>
import { CheckCircle2, XCircle, Sparkles } from 'lucide-vue-next'
defineProps({
  title: String,
  items: { type: Array, default: () => [] },
  variant: { type: String, default: 'default' } // default | success | danger
})
</script>

<template>
  <div class="card">
    <div class="flex items-center gap-2 mb-4">
      <component :is="variant === 'danger' ? XCircle : variant === 'success' ? CheckCircle2 : Sparkles"
        class="w-5 h-5" :class="{
          'text-emerald-500': variant === 'success',
          'text-red-500': variant === 'danger',
          'text-brand-500': variant === 'default'
        }" />
      <h3 class="font-semibold">{{ title }}</h3>
      <span class="ml-auto text-xs text-slate-500">{{ items.length }}</span>
    </div>
    <div v-if="items.length" class="flex flex-wrap gap-2">
      <span v-for="(s, i) in items" :key="i"
        class="chip"
        :class="{
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300': variant === 'success',
          'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300': variant === 'danger',
          'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300': variant === 'default'
        }">{{ s }}</span>
    </div>
    <p v-else class="text-sm text-slate-500">None reported.</p>
  </div>
</template>
