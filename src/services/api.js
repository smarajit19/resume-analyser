import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://smarajit94.app.n8n.cloud/webhook-test/resume-analyzer'

const client = axios.create({
  timeout: 90000,
  headers: { Accept: 'application/json' }
})

function parseJsonString(value) {
  if (typeof value !== 'string') return value

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function normalizeAnalysisResponse(data) {
  let result = Array.isArray(data) ? data[0] : data
  result = parseJsonString(result)

  if (result?.output) {
    result = parseJsonString(result.output)
  }

  if (Array.isArray(result)) {
    result = result[0]
  }

  return result
}

/**
 * Submit resume to ATS analyzer API.
 * Only sends the API-required fields: email, data, job_description.
 */
export async function analyzeResume({ email, resumeFile, jobDescription }, { retries = 1 } = {}) {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('data', resumeFile)
  formData.append('job_description', jobDescription?.trim() || '')

  let lastErr
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const { data } = await client.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return normalizeAnalysisResponse(data)
    } catch (err) {
      lastErr = err
      if (attempt < retries) await new Promise(r => setTimeout(r, 1200))
    }
  }
  throw lastErr
}
