import { kebabCase } from 'lodash'

export const getDocumentItemStatusKey =
  (document: string) => (status: string) =>
    `${kebabCase(document)}-${kebabCase(status)}`
