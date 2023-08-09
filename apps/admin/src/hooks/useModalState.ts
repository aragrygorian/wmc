import { useEffect, useState } from 'react'

/**
 * Manages modal open/close state and
 * disables body scrolling when modal is open
 * @param defaultState boolean
 */
const useModalState = (
  defaultState = false
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(defaultState)
  const handleMount = () => {
    document.body.style.setProperty('overflow', 'hidden')
  }
  const handleUnmount = () => {
    document.body.style.removeProperty('overflow')
  }
  useEffect(() => {
    if (open) handleMount()
    if (!open) handleUnmount()
    return () => {
      handleUnmount()
    }
  }, [open])
  return [open, setOpen]
}

export default useModalState
