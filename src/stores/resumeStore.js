import { defineStore } from 'pinia'
import { analyzeResume } from '@/services/api'

const STORAGE_KEY = 'ats-resume-analysis'

function loadSavedState() {
  if (typeof window === 'undefined') return null

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

function saveState(state) {
  if (typeof window === 'undefined') return

  const safeState = {
    form: {
      firstName: state.form.firstName,
      lastName: state.form.lastName,
      email: state.form.email,
      phone: state.form.phone,
      jobDescription: state.form.jobDescription
    },
    result: state.result
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeState))
}

function clearSavedState() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY)
}

const savedState = loadSavedState()

export const useResumeStore = defineStore('resume', {
  state: () => ({
    form: {
      firstName: savedState?.form?.firstName || '',
      lastName: savedState?.form?.lastName || '',
      email: savedState?.form?.email || '',
      phone: savedState?.form?.phone || '',
      jobDescription: savedState?.form?.jobDescription || '',
      resumeFile: null
    },
    loading: false,
    error: null,
    result: savedState?.result || null
  }),
  actions: {
    setField(key, value) { this.form[key] = value },
    setFile(file) { this.form.resumeFile = file },
    reset() {
      this.form = { firstName: '', lastName: '', email: '', phone: '', jobDescription: '', resumeFile: null }
      this.result = null; this.error = null
      clearSavedState()
    },
    async submit() {
      this.loading = true; this.error = null
      try {
        this.result = await analyzeResume({
          email: this.form.email,
          resumeFile: this.form.resumeFile,
          jobDescription: this.form.jobDescription
        })
        saveState(this)
        return this.result
      } catch (e) {
        this.error = e?.response?.data?.message || e.message || 'Something went wrong'
        throw e
      } finally {
        this.loading = false
      }
    }
  }
})
