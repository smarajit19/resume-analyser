<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useResumeStore } from '@/stores/resumeStore'
import FileDropzone from './FileDropzone.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import { Send } from 'lucide-vue-next'

const store = useResumeStore()
const router = useRouter()

const form = reactive({
  firstName: store.form.firstName, lastName: store.form.lastName,
  email: store.form.email, phone: store.form.phone,
  jobDescription: store.form.jobDescription
})
const file = computed({
  get: () => store.form.resumeFile,
  set: (v) => store.setFile(v)
})

const errors = reactive({})

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.firstName.trim()) errors.firstName = 'Required'
  if (!form.lastName.trim()) errors.lastName = 'Required'
  if (!form.email.trim()) errors.email = 'Required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email'
  if (!file.value) errors.file = 'Resume is required'
  return Object.keys(errors).length === 0
}

async function onSubmit() {
  if (!validate()) { toast.error('Please fix the highlighted fields'); return }
  Object.entries(form).forEach(([k, v]) => store.setField(k, v))
  try {
    await store.submit()
    toast.success('Analysis complete!')
    router.push('/results')
  } catch (e) {
    toast.error(store.error || 'Failed to analyze resume')
  }
}
</script>

<template>
  <section class="px-4 sm:px-6 lg:px-8 pb-20">
    <div class="max-w-3xl mx-auto card animate-slide-up">
      <h2 class="text-2xl font-bold">Analyze Your Resume</h2>
      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Fill in the details below and upload your resume.</p>

      <form @submit.prevent="onSubmit" class="mt-6 space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="label">First Name <span class="text-red-500">*</span></label>
            <input v-model="form.firstName" class="input" :class="{'ring-2 ring-red-500': errors.firstName}" placeholder="John" />
            <p v-if="errors.firstName" class="text-xs text-red-500 mt-1">{{ errors.firstName }}</p>
          </div>
          <div>
            <label class="label">Last Name <span class="text-red-500">*</span></label>
            <input v-model="form.lastName" class="input" :class="{'ring-2 ring-red-500': errors.lastName}" placeholder="Doe" />
            <p v-if="errors.lastName" class="text-xs text-red-500 mt-1">{{ errors.lastName }}</p>
          </div>
          <div>
            <label class="label">Email <span class="text-red-500">*</span></label>
            <input v-model="form.email" type="email" class="input" :class="{'ring-2 ring-red-500': errors.email}" placeholder="john@example.com" />
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          </div>
          <div>
            <label class="label">Phone</label>
            <input v-model="form.phone" class="input" placeholder="+1 555 123 4567" />
          </div>
        </div>

        <div>
          <label class="label">Job Description <span class="text-slate-400">(optional)</span></label>
          <textarea v-model="form.jobDescription" rows="5" class="input resize-y"
            :class="{'ring-2 ring-red-500': errors.jobDescription}"
            placeholder="Paste the job description if you want a job-specific match..."></textarea>
          <p v-if="errors.jobDescription" class="text-xs text-red-500 mt-1">{{ errors.jobDescription }}</p>
        </div>

        <FileDropzone v-model="file" @error="(m) => toast.error(m)" />
        <p v-if="errors.file" class="text-xs text-red-500 -mt-3">{{ errors.file }}</p>

        <button type="submit" class="btn-primary w-full text-base py-3.5" :disabled="store.loading">
          <Send class="w-4 h-4" />
          {{ store.loading ? 'Analyzing...' : 'Analyze Resume' }}
        </button>
      </form>
    </div>
    <LoadingOverlay v-if="store.loading" />
  </section>
</template>
