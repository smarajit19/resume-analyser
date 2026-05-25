<script setup>
import { ref, computed } from 'vue'
import { UploadCloud, FileText, X } from 'lucide-vue-next'

const props = defineProps({ modelValue: { type: Object, default: null } })
const emit = defineEmits(['update:modelValue', 'error'])

const dragOver = ref(false)
const inputRef = ref(null)

const ACCEPT = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

function handleFiles(files) {
  const file = files?.[0]
  if (!file) return
  if (!ACCEPT.includes(file.type) && !/\.(pdf|docx?|DOC|DOCX|PDF)$/i.test(file.name)) {
    emit('error', 'Only PDF, DOC, DOCX files are allowed'); return
  }
  if (file.size > MAX_SIZE) { emit('error', 'File must be under 5MB'); return }
  emit('update:modelValue', file)
}
function onDrop(e) { dragOver.value = false; handleFiles(e.dataTransfer.files) }
function onPick(e) { handleFiles(e.target.files) }
function remove() { emit('update:modelValue', null); if (inputRef.value) inputRef.value.value = '' }
const sizeKb = computed(() => props.modelValue ? (props.modelValue.size / 1024).toFixed(1) : 0)
</script>

<template>
  <div>
    <label class="label">Resume Upload <span class="text-red-500">*</span></label>
    <div v-if="!modelValue"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
      @click="inputRef.click()"
      :class="['relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition',
        dragOver ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'border-slate-300 dark:border-white/10 hover:border-brand-400']">
      <UploadCloud class="w-10 h-10 mx-auto text-brand-500" />
      <p class="mt-3 font-medium">Drag & drop your resume here</p>
      <p class="text-sm text-slate-500 mt-1">or click to browse — PDF, DOC, DOCX (max 5MB)</p>
      <input ref="inputRef" type="file" class="hidden" accept=".pdf,.doc,.docx" @change="onPick" />
    </div>

    <div v-else class="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 animate-fade-in">
      <div class="w-10 h-10 rounded-lg bg-brand-gradient grid place-items-center">
        <FileText class="w-5 h-5 text-white" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-medium truncate">{{ modelValue.name }}</p>
        <p class="text-xs text-slate-500">{{ sizeKb }} KB</p>
      </div>
      <button @click="remove" type="button" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Remove file">
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
