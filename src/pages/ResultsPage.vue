<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useResumeStore } from '@/stores/resumeStore'
import ScoreCard from '@/components/ScoreCard.vue'
import SkillsCard from '@/components/SkillsCard.vue'
import InsightsCard from '@/components/InsightsCard.vue'
import RecommendationCard from '@/components/RecommendationCard.vue'
import VerdictCard from '@/components/VerdictCard.vue'
import { Copy, Download, ArrowLeft, CheckCircle2, XCircle } from 'lucide-vue-next'
import { toast } from 'vue3-toastify'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const store = useResumeStore()
const router = useRouter()
const r = computed(() => store.result || {})
const reportRef = ref(null)

const sections = computed(() => Object.entries(r.value.section_structure || {}))

function copyJson() {
  navigator.clipboard.writeText(JSON.stringify(r.value, null, 2))
  toast.success('Analysis copied to clipboard')
}

async function exportPdf() {
  if (!reportRef.value) return
  toast.info('Generating PDF...')
  const canvas = await html2canvas(reportRef.value, { scale: 2, backgroundColor: '#ffffff' })
  const img = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const w = pdf.internal.pageSize.getWidth()
  const h = (canvas.height * w) / canvas.width
  pdf.addImage(img, 'PNG', 0, 0, w, h)
  pdf.save('ats-analysis.pdf')
}
</script>

<template>
  <section class="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-8">
      <div>
        <button @click="router.push('/')" class="btn-ghost text-sm"><ArrowLeft class="w-4 h-4" /> New analysis</button>
        <h1 class="text-3xl sm:text-4xl font-extrabold mt-2">Resume Analysis</h1>
        <p class="text-slate-500 dark:text-slate-400">Detailed insights for {{ store.form.firstName }} {{ store.form.lastName }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="copyJson" class="btn-ghost"><Copy class="w-4 h-4" /> Copy</button>
        <button @click="exportPdf" class="btn-primary !py-2.5"><Download class="w-4 h-4" /> Export PDF</button>
      </div>
    </div>

    <div v-if="store.result" ref="reportRef" class="space-y-6">
      <!-- Scores -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard :score="r.ats_compatibility_score || 0" label="ATS Compatibility" :status="r.ats_compatibility" />
        <ScoreCard :score="r.skills_matching_score || 0" label="Skills Match" />
        <ScoreCard :score="r.job_match_score || 0" label="Job Match" :status="r.job_match" />
      </div>

      <!-- Readability + Sections -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="font-semibold mb-3">Readability</h3>
          <div class="flex items-end gap-3">
            <span class="text-5xl font-extrabold bg-brand-gradient bg-clip-text text-transparent">{{ r.readability?.score ?? 0 }}</span>
            <span class="text-slate-500 mb-2">/ 100</span>
          </div>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Level: <strong>{{ r.readability?.level || '-' }}</strong></p>
        </div>
        <div class="card">
          <h3 class="font-semibold mb-3">Section Structure</h3>
          <ul class="grid grid-cols-2 gap-2">
            <li v-for="[name, status] in sections" :key="name"
              class="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-white/5">
              <CheckCircle2 v-if="String(status).toLowerCase() === 'exists'" class="w-4 h-4 text-emerald-500" />
              <XCircle v-else class="w-4 h-4 text-red-500" />
              <span class="capitalize text-sm font-medium">{{ name }}</span>
              <span class="ml-auto text-xs text-slate-500">{{ status }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Skills -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkillsCard title="Technical Skills" :items="r.technical_skills || []" variant="default" />
        <SkillsCard title="Available Skills" :items="r.available_skills || []" variant="success" />
        <SkillsCard title="Missing Skills" :items="r.missing_skills || []" variant="danger" />
      </div>

      <!-- Keywords / Formatting -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillsCard title="Missing Keywords" :items="r.missing_keywords || []" variant="danger" />
        <InsightsCard title="Formatting Issues" :items="r.formatting_issues || []" icon="warn" />
      </div>

      <!-- Insights -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightsCard title="Weak Bullet Points" :items="r.weak_bullet_points || []" icon="warn" />
        <InsightsCard title="ATS Parsing Issues" :items="r.ats_parsing_issues || []" icon="warn" />
      </div>

      <InsightsCard title="ATS Simulation Insights" :items="r.ats_simulation_insights || []" icon="info" />

      <RecommendationCard :items="r.recommendations || []" />

      <VerdictCard :verdict="r.final_verdict" />
    </div>
    <div v-else class="card max-w-2xl">
      <h2 class="text-xl font-bold">No analysis result found</h2>
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Run a new resume analysis first, then this page will show the saved report.
      </p>
      <button @click="router.push('/')" class="btn-primary mt-5">
        <ArrowLeft class="w-4 h-4" /> Go to upload
      </button>
    </div>
  </section>
</template>
