<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  score: { type: Number, required: true },
  label: { type: String, default: 'Score' },
  status: { type: String, default: '' }, // 'pass' | 'fail' | ''
  size: { type: Number, default: 160 }
})

const display = ref(0)
function animate(to) {
  const start = performance.now()
  const from = display.value
  const dur = 900
  function step(t) {
    const p = Math.min(1, (t - start) / dur)
    display.value = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
onMounted(() => animate(props.score || 0))
watch(() => props.score, (v) => animate(v || 0))

const radius = computed(() => (props.size - 16) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value * (1 - display.value / 100))
const color = computed(() => display.value >= 75 ? '#10b981' : display.value >= 50 ? '#f59e0b' : '#ef4444')
const passBadge = computed(() => props.status?.toLowerCase() === 'pass')
</script>

<template>
  <div class="card flex flex-col items-center justify-center">
    <div class="relative" :style="{ width: size + 'px', height: size + 'px' }">
      <svg :width="size" :height="size" class="-rotate-90">
        <circle :cx="size/2" :cy="size/2" :r="radius" stroke="currentColor" class="text-slate-200 dark:text-white/10" stroke-width="12" fill="none" />
        <circle :cx="size/2" :cy="size/2" :r="radius" :stroke="color" stroke-width="12" fill="none"
          :stroke-dasharray="circumference" :stroke-dashoffset="offset" stroke-linecap="round"
          style="transition: stroke-dashoffset 0.3s ease;" />
      </svg>
      <div class="absolute inset-0 grid place-items-center">
        <div class="text-center">
          <div class="text-4xl font-extrabold" :style="{ color }">{{ display }}<span class="text-xl">%</span></div>
        </div>
      </div>
    </div>
    <p class="mt-4 font-semibold">{{ label }}</p>
    <span v-if="status" class="chip mt-2"
      :class="passBadge ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'">
      {{ passBadge ? '✓ Pass' : '✗ Fail' }}
    </span>
  </div>
</template>
