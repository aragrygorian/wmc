import { useMemo } from 'react'
import downloadjs from 'downloadjs'
import { useRouter } from 'next/router'
import qs from 'qs'
import toast from 'react-hot-toast'
import { appConfig } from '@admin/app/config'

type UsePdfPrint = () => {
  isPrintMode: boolean
  handlePrint: ({
    url,
    queryParams,
    filename,
  }?: {
    url?: string
    queryParams?: Record<string, unknown>
    filename: string
  }) => Promise<{ success: boolean; error?: Error }>
  isReady: boolean
  queryParams: Record<string, string>
}

const usePdfPrint: UsePdfPrint = () => {
  const router = useRouter()
  const { query, isReady } = router

  const printPdf = async (args) => {
    const { url, queryParams, filename } = args || {}

    const nextURL = new URL(
      (url ?? window.location.href).replace(
        'http://localhost:3000',
        appConfig.absoluteUrl
      )
    )
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) =>
        nextURL.searchParams.append(key, value as string)
      )
    }
    const data = { url: nextURL }
    const res: Response = await fetch('/_api/print-pdf', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('Error in postData', { url, data, res })

      throw Error(res.statusText)
    }

    const { contentEncoding, contentType } = await res.json()
    downloadjs(
      `data:application/pdf;base64,${contentEncoding}`,
      filename,
      contentType
    )
  }

  const handlePrint: ReturnType<UsePdfPrint>['handlePrint'] = async (
    { url, queryParams, filename } = { filename: 'File.pdf' }
  ) => {
    try {
      toast.promise(printPdf({ url, queryParams, filename }), {
        loading: 'Kindly wait while we generate your PDF...',
        success: 'Your PDF has been generated!',
        error: 'There was an error generating your PDF!',
      })

      return { success: true }
    } catch (error) {
      toast.error('There was an error generating your PDF!')
      console.error(error)
      return { success: false, error }
    }
  }

  const queryParams = useMemo(
    () =>
      typeof window !== 'undefined'
        ? qs.parse(window.location.search.replace(/^\?/, ''))
        : null,
    [typeof window]
  )
  const isPrintMode = Boolean(query.print)

  return {
    isPrintMode,
    handlePrint,
    isReady,
    queryParams,
  }
}

export default usePdfPrint
