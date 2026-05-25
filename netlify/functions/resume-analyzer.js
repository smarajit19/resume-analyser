const DEFAULT_WEBHOOK_URL = 'https://smarajit94.app.n8n.cloud/webhook/resume-analyzer'

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Method not allowed' })
    }
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL || DEFAULT_WEBHOOK_URL
  const contentType = event.headers['content-type'] || event.headers['Content-Type']
  const body = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : event.body

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(contentType ? { 'Content-Type': contentType } : {})
      },
      body
    })

    const responseBody = await response.text()
    const responseContentType = response.headers.get('content-type') || 'application/json'

    return {
      statusCode: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': responseContentType
      },
      body: responseBody
    }
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Unable to reach resume analyzer webhook',
        error: error.message
      })
    }
  }
}
