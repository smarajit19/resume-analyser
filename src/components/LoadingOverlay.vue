<script setup>
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <div class="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 backdrop-blur-sm animate-fade-in">
    <div class="card text-center max-w-sm mx-4">
      <Loader2 class="w-10 h-10 mx-auto text-brand-500 animate-spin" />
      <h3 class="mt-4 font-semibold text-lg">Analyzing your resume…</h3>
      <p class="text-sm text-slate-500 mt-1">Our AI is parsing, scoring, and matching keywords. Hang tight.</p>
    </div>
  </div>
</template>
