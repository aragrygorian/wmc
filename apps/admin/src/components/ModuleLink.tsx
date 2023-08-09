import React from 'react'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { Link } from '@gravis-os/ui'

interface ModuleLinkProps {
  module: CrudModule
  item: CrudItem
}

const ModuleLink: React.FC<ModuleLinkProps> = (props) => {
  const { module, item } = props

  if (!module.route || !item) return null

  return (
    <Link
      href={module.route.plural.concat(`/${item[module.sk]}`)}
      target="_blank"
      underline="always"
    >
      {item.title}
    </Link>
  )
}

export default ModuleLink
