import { useEffect, useState } from 'react'

// Hook for setting data from async database response
const useDatabaseResponse = (serviceCallback, args) => {
  const [response, setResponse] = useState(undefined)
  const [loading, setLoading] = useState(false)
  let isStale = false

  const callback = async () => {
    setLoading(true)
    const serviceResponse = await serviceCallback(...args)
    serviceResponse['loading'] = false
    setLoading(false)
    if (!isStale) {
      setResponse(serviceResponse)
    }
  }

  useEffect(() => {
    callback()
    // Prevent old response from being set as state if hook is called multiple times
    return () => isStale = true
  }, [])

  return loading ? { loading } : response
}

export default useDatabaseResponse