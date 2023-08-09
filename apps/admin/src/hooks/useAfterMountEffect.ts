import { useEffect, useRef } from 'react'

const useAfterMountEffect: typeof useEffect = (effect, deps) => {
  const didMountRef = useRef(false)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (didMountRef.current) {
      const destroy = effect()
      return () => {
        if (typeof destroy === 'function') destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
    }
    return () => {
      didMountRef.current = false
    }
  }, [])

  return didMountRef.current
}

export default useAfterMountEffect
