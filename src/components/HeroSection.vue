<script setup>
import { Sparkles, Target, BarChart3, Lightbulb } from 'lucide-vue-next'

const features = [
  { icon: Target, title: 'ATS Score', desc: 'Instant compatibility scoring with industry ATS systems.' },
  { icon: BarChart3, title: 'Skill Matching', desc: 'See exactly which skills match and which are missing.' },
  { icon: Sparkles, title: 'Resume Insights', desc: 'Deep insights on formatting, readability, and structure.' },
  { icon: Lightbulb, title: 'AI Recommendations', desc: 'Actionable tips powered by AI to boost your score.' }
]
</script>

<template>
  <section class="relative pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto text-center animate-slide-up">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-brand-600 dark:text-brand-300 mb-6">
        <Sparkles class="w-3.5 h-3.5" /> AI Powered • Real-time analysis
      </div>
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
        <span class="block">AI Powered</span>
        <span class="bg-brand-gradient bg-clip-text text-transparent">ATS Resume Analyzer</span>
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Upload your resume and instantly get ATS compatibility, skill matching, keyword analysis, and improvement recommendations.
      </p>
    </div>

    <div class="max-w-6xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(f, i) in features" :key="f.title"
        class="card hover:scale-[1.02] transition-transform animate-fade-in"
        :style="{ animationDelay: `${i * 80}ms` }">
        <div class="w-11 h-11 rounded-xl bg-brand-gradient grid place-items-center mb-4 shadow-lg shadow-brand-500/20">
          <component :is="f.icon" class="w-5 h-5 text-white" />
        </div>
        <h3 class="font-semibold text-lg">{{ f.title }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ f.desc }}</p>
      </div>
    </div>
  </section>
</template>
