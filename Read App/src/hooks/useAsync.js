import { useCallback, useEffect, useRef, useState } from 'react'

export function useAsync(asyncFunction, deps = [], { immediate = true } = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)

  useEffect(() => () => {
    mountedRef.current = false
  }, [])

  const execute = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const result = await asyncFunction(...args)
        if (mountedRef.current) setData(result)
        return result
      } catch (err) {
        if (mountedRef.current) setError(err)
        throw err
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  useEffect(() => {
    if (immediate) execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { execute, loading, error, data, setData }
}


