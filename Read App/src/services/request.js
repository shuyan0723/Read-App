const DEFAULT_TIMEOUT_MS = 15000

function buildUrl(pathOrUrl, params) {
  const base = import.meta.env.VITE_API_BASE_URL || ''
  const isAbsolute = /^https?:\/\//i.test(pathOrUrl)
  const url = new URL(isAbsolute ? pathOrUrl : `${base}${pathOrUrl}`, window.location.origin)
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)))
      } else {
        url.searchParams.set(key, String(value))
      }
    })
  }
  return url.toString()
}

function normalizeError(error, response) {
  if (error?.name === 'AbortError') {
    return { code: 'ABORTED', message: '请求已取消或超时', detail: error }
  }
  if (response) {
    return {
      code: response.status,
      message: `请求失败: ${response.status} ${response.statusText}`,
      detail: error,
    }
  }
  return { code: 'UNKNOWN', message: error?.message || '未知错误', detail: error }
}

export async function request(pathOrUrl, options = {}) {
  const {
    method = 'GET',
    headers = {},
    params,
    json,
    body,
    timeout = DEFAULT_TIMEOUT_MS,
    ...rest
  } = options

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  const url = buildUrl(pathOrUrl, params)

  const finalHeaders = new Headers(headers)
  let finalBody = body
  if (json !== undefined) {
    finalHeaders.set('Content-Type', 'application/json')
    finalBody = JSON.stringify(json)
  }

  let response
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: finalBody,
      signal: controller.signal,
      ...rest,
    })
  } catch (err) {
    clearTimeout(timer)
    throw normalizeError(err)
  }

  clearTimeout(timer)

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json().catch(() => ({})) : await response.text()

  if (!response.ok) {
    const message = (isJson && (data?.message || data?.error)) || String(data)
    throw normalizeError(new Error(message), response)
  }

  return data
}

export function get(pathOrUrl, options = {}) {
  return request(pathOrUrl, { ...options, method: 'GET' })
}

export function post(pathOrUrl, options = {}) {
  return request(pathOrUrl, { ...options, method: 'POST' })
}

export function put(pathOrUrl, options = {}) {
  return request(pathOrUrl, { ...options, method: 'PUT' })
}

export function del(pathOrUrl, options = {}) {
  return request(pathOrUrl, { ...options, method: 'DELETE' })
}


